"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Maximize, Minimize, Volume2, VolumeX, Loader2 } from "lucide-react";
import { useFullscreen } from "@/hooks/useFullscreen";

// Types
type PlayState = "teaser" | "idle" | "disabled" | "ready" | "playingSplit" | "playingPip" | "ended" | "error";

interface BeforeAfterShowstopperProps {
    oldSrc: string;
    newSrc?: string;
    oldStartMode?: "half" | "seconds";
    oldStartSeconds?: number;
    pipDelaySeconds?: number; // Time before transitioning to PiP (default 5)
}

export default function BeforeAfterShowstopper({
    oldSrc,
    newSrc,
    oldStartMode = "half",
    oldStartSeconds = 0,
    pipDelaySeconds = 5,
}: BeforeAfterShowstopperProps) {
    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const oldVideoRef = useRef<HTMLVideoElement>(null);
    const newVideoRef = useRef<HTMLVideoElement>(null);
    const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const pipTimerRef = useRef<NodeJS.Timeout | null>(null);

    // State
    const [playState, setPlayState] = useState<PlayState>("teaser");
    const [oldDuration, setOldDuration] = useState(0);
    const [newDuration, setNewDuration] = useState(0);
    const [oldReady, setOldReady] = useState(false);
    const [newReady, setNewReady] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [oldStartTime, setOldStartTime] = useState(0);

    // Fullscreen
    const { isFullscreen, toggle: toggleFullscreen, isSupported: fullscreenSupported } = useFullscreen(stageRef);

    // Calculate old video start time
    const calculateOldStartTime = useCallback(() => {
        if (oldStartMode === "seconds") {
            return oldStartSeconds;
        }
        // "half" mode - start at 50%
        return oldDuration / 2;
    }, [oldStartMode, oldStartSeconds, oldDuration]);

    // Intersection Observer for lazy loading and teaser trigger
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    }
                });
            },
            { rootMargin: "300px", threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Teaser → Idle transition
    useEffect(() => {
        if (playState === "teaser" && isInView) {
            const timer = setTimeout(() => {
                if (!newSrc) {
                    setPlayState("disabled");
                } else {
                    setPlayState("idle");
                }
            }, 2500); // 2.5 second teaser

            return () => clearTimeout(timer);
        }
    }, [playState, isInView, newSrc]);

    // Preload videos when in view
    useEffect(() => {
        if (isInView && playState !== "teaser") {
            // Load old video
            if (oldVideoRef.current) {
                oldVideoRef.current.preload = "auto";
                oldVideoRef.current.load();
            }
            // Load new video if available
            if (newVideoRef.current && newSrc) {
                newVideoRef.current.preload = "auto";
                newVideoRef.current.load();
            }
        }
    }, [isInView, playState, newSrc]);

    // Check if ready to play
    useEffect(() => {
        if (playState === "idle" && oldReady && (newReady || !newSrc)) {
            setPlayState(newSrc ? "ready" : "disabled");
        }
    }, [playState, oldReady, newReady, newSrc]);

    // Handle old video metadata
    const handleOldLoadedMetadata = useCallback(() => {
        if (oldVideoRef.current) {
            setOldDuration(oldVideoRef.current.duration);
        }
    }, []);

    // Handle new video metadata
    const handleNewLoadedMetadata = useCallback(() => {
        if (newVideoRef.current) {
            setNewDuration(newVideoRef.current.duration);
        }
    }, []);

    // Handle video ready states
    const handleOldCanPlay = useCallback(() => {
        setOldReady(true);
    }, []);

    const handleNewCanPlay = useCallback(() => {
        setNewReady(true);
    }, []);

    // Handle video errors
    const handleVideoError = useCallback((videoName: string) => {
        return () => {
            setErrorMessage(`Failed to load ${videoName} video`);
            setPlayState("error");
        };
    }, []);

    // Handle new video ended
    const handleNewVideoEnded = useCallback(() => {
        // Clean up
        if (syncIntervalRef.current) {
            clearInterval(syncIntervalRef.current);
        }
        if (pipTimerRef.current) {
            clearTimeout(pipTimerRef.current);
        }
        
        // Pause old video
        if (oldVideoRef.current) {
            oldVideoRef.current.pause();
            oldVideoRef.current.playbackRate = 1;
        }

        setPlayState("ended");
    }, []);

    // Sync videos (best-effort)
    const startSyncLoop = useCallback(() => {
        const startTime = Date.now();
        
        syncIntervalRef.current = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            
            // Only sync for first 10 seconds
            if (elapsed > 10) {
                if (syncIntervalRef.current) {
                    clearInterval(syncIntervalRef.current);
                }
                return;
            }

            if (oldVideoRef.current && newVideoRef.current) {
                const expectedOldTime = oldStartTime + newVideoRef.current.currentTime;
                const actualOldTime = oldVideoRef.current.currentTime;
                const drift = Math.abs(actualOldTime - expectedOldTime);

                if (drift > 0.25) {
                    oldVideoRef.current.currentTime = expectedOldTime;
                }
            }
        }, 500);
    }, [oldStartTime]);

    // Play handler
    const handlePlay = useCallback(async () => {
        if (playState !== "ready") return;

        const oldVideo = oldVideoRef.current;
        const newVideo = newVideoRef.current;

        if (!oldVideo || !newVideo) return;

        try {
            // Calculate and set old video start time
            const startTime = calculateOldStartTime();
            setOldStartTime(startTime);
            oldVideo.currentTime = startTime;
            newVideo.currentTime = 0;

            // Start both videos
            setPlayState("playingSplit");
            
            await Promise.all([
                oldVideo.play(),
                newVideo.play()
            ]);

            // Start sync loop
            startSyncLoop();

            // Set timer for PiP transition
            pipTimerRef.current = setTimeout(() => {
                if (oldVideo) {
                    oldVideo.playbackRate = 5;
                }
                setPlayState("playingPip");
            }, pipDelaySeconds * 1000);

        } catch (error) {
            console.error("Failed to play videos:", error);
            setErrorMessage("Failed to play videos. Please try again.");
            setPlayState("error");
        }
    }, [playState, calculateOldStartTime, startSyncLoop, pipDelaySeconds]);

    // Replay handler
    const handleReplay = useCallback(() => {
        // Reset everything
        if (oldVideoRef.current) {
            oldVideoRef.current.pause();
            oldVideoRef.current.playbackRate = 1;
            oldVideoRef.current.currentTime = 0;
        }
        if (newVideoRef.current) {
            newVideoRef.current.pause();
            newVideoRef.current.currentTime = 0;
        }
        if (syncIntervalRef.current) {
            clearInterval(syncIntervalRef.current);
        }
        if (pipTimerRef.current) {
            clearTimeout(pipTimerRef.current);
        }

        setPlayState("ready");
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
            if (pipTimerRef.current) clearTimeout(pipTimerRef.current);
        };
    }, []);

    // Determine if old video should be in PiP mode
    const isOldPip = playState === "playingPip";
    const isPlaying = playState === "playingSplit" || playState === "playingPip";

    return (
        <section 
            ref={containerRef}
            className="relative min-h-screen bg-[#0a0a0f] overflow-hidden py-24"
        >
            {/* Background gradient */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-fuchsia-500/5 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-8">
                {/* Teaser State - "One more thing..." */}
                <AnimatePresence mode="wait">
                    {playState === "teaser" && (
                        <motion.div
                            key="teaser"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-center justify-center min-h-[70vh]"
                        >
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-5xl md:text-7xl font-bold text-white tracking-tight text-center"
                            >
                                One more thing...
                            </motion.h2>
                        </motion.div>
                    )}

                    {/* Main Content */}
                    {playState !== "teaser" && (
                        <motion.div
                            key="main"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Header */}
                            <div className="text-center mb-12">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                                >
                                    We rebuilt the{" "}
                                    <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                                        pricing experience
                                    </span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl text-white/60"
                                >
                                    From minutes of friction to seconds of flow
                                </motion.p>
                            </div>

                            {/* Video Stage */}
                            <div 
                                ref={stageRef}
                                className={`relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-xl ${
                                    isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'aspect-video max-h-[70vh]'
                                }`}
                            >
                                {/* Split View Container */}
                                <div className={`relative w-full h-full flex ${isOldPip ? '' : 'gap-1'}`}>
                                    
                                    {/* OLD Video Panel */}
                                    <motion.div
                                        className={`relative overflow-hidden ${
                                            isOldPip 
                                                ? 'absolute top-4 left-4 z-30 w-72 rounded-xl ring-2 ring-white/20 shadow-2xl' 
                                                : 'flex-1'
                                        }`}
                                        layout
                                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                    >
                                        {/* OLD Label */}
                                        <div className={`absolute top-3 left-3 z-20 px-3 py-1.5 rounded-lg bg-red-500/90 backdrop-blur-sm ${isOldPip ? 'text-xs' : 'text-sm'}`}>
                                            <span className="font-semibold text-white">The Old Way</span>
                                        </div>

                                        {/* 5x Badge */}
                                        <AnimatePresence>
                                            {isOldPip && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="absolute top-3 right-3 z-20 px-2 py-1 rounded-md bg-orange-500 text-white text-xs font-bold"
                                                >
                                                    5x
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <video
                                            ref={oldVideoRef}
                                            src={oldSrc}
                                            className="w-full h-full object-cover"
                                            preload="metadata"
                                            muted
                                            playsInline
                                            onLoadedMetadata={handleOldLoadedMetadata}
                                            onCanPlayThrough={handleOldCanPlay}
                                            onError={handleVideoError("old")}
                                        />
                                    </motion.div>

                                    {/* NEW Video Panel */}
                                    <motion.div
                                        className={`relative overflow-hidden bg-slate-900 ${
                                            isOldPip ? 'flex-1' : 'flex-1'
                                        }`}
                                        layout
                                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                    >
                                        {/* NEW Label */}
                                        <div className={`absolute top-3 ${isOldPip ? 'left-3' : 'right-3'} z-20 px-3 py-1.5 rounded-lg bg-emerald-500/90 backdrop-blur-sm text-sm`}>
                                            <span className="font-semibold text-white">The New Way</span>
                                        </div>

                                        {newSrc ? (
                                            <video
                                                ref={newVideoRef}
                                                src={newSrc}
                                                className="w-full h-full object-cover"
                                                preload="metadata"
                                                muted
                                                playsInline
                                                onLoadedMetadata={handleNewLoadedMetadata}
                                                onCanPlayThrough={handleNewCanPlay}
                                                onError={handleVideoError("new")}
                                                onEnded={handleNewVideoEnded}
                                            />
                                        ) : (
                                            /* Placeholder for missing new video */
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                                <div className="text-center p-8">
                                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                                                        <Play className="w-8 h-8 text-white/40" />
                                                    </div>
                                                    <p className="text-white/60 text-lg font-medium mb-2">
                                                        New experience video
                                                    </p>
                                                    <p className="text-white/40 text-sm">
                                                        Coming soon
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>

                                {/* Central Play Button Overlay */}
                                <AnimatePresence>
                                    {(playState === "ready" || playState === "disabled") && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                                        >
                                            <motion.button
                                                onClick={handlePlay}
                                                disabled={playState === "disabled"}
                                                className={`group relative flex items-center gap-4 px-8 py-4 rounded-2xl transition-all ${
                                                    playState === "disabled"
                                                        ? 'bg-white/10 cursor-not-allowed'
                                                        : 'bg-white/20 hover:bg-white/30 hover:scale-105'
                                                }`}
                                                whileHover={playState !== "disabled" ? { scale: 1.05 } : {}}
                                                whileTap={playState !== "disabled" ? { scale: 0.95 } : {}}
                                            >
                                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                                                    playState === "disabled" ? 'bg-white/20' : 'bg-white/30 group-hover:bg-white/40'
                                                }`}>
                                                    <Play className={`w-8 h-8 ml-1 ${playState === "disabled" ? 'text-white/40' : 'text-white'}`} />
                                                </div>
                                                <div className="text-left">
                                                    <p className={`text-lg font-semibold ${playState === "disabled" ? 'text-white/40' : 'text-white'}`}>
                                                        {playState === "disabled" ? "Video Not Ready" : "Watch the Difference"}
                                                    </p>
                                                    <p className={`text-sm ${playState === "disabled" ? 'text-white/30' : 'text-white/60'}`}>
                                                        {playState === "disabled" ? "New video coming soon" : "Side by side comparison"}
                                                    </p>
                                                </div>
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Loading State */}
                                <AnimatePresence>
                                    {playState === "idle" && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-20 flex items-center justify-center bg-black/60"
                                        >
                                            <div className="flex items-center gap-3 text-white">
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                                <span>Loading videos...</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* End State Overlay */}
                                <AnimatePresence>
                                    {playState === "ended" && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-md"
                                        >
                                            <div className="text-center">
                                                <motion.h3
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                                                >
                                                    This is the new standard
                                                </motion.h3>
                                                <motion.p
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="text-xl text-white/60 mb-8"
                                                >
                                                    Minutes → Seconds. Friction → Flow.
                                                </motion.p>
                                                <motion.button
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                    onClick={handleReplay}
                                                    className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors text-white font-medium"
                                                >
                                                    <RotateCcw className="w-5 h-5" />
                                                    Watch Again
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Error State */}
                                <AnimatePresence>
                                    {playState === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-20 flex items-center justify-center bg-black/80"
                                        >
                                            <div className="text-center">
                                                <p className="text-red-400 mb-4">{errorMessage}</p>
                                                <button
                                                    onClick={() => window.location.reload()}
                                                    className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white"
                                                >
                                                    Reload Page
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Bottom Controls */}
                                <div className={`absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity ${
                                    isPlaying || playState === "ended" ? 'opacity-100' : 'opacity-0'
                                }`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Replay button during playback */}
                                            {isPlaying && (
                                                <button
                                                    onClick={handleReplay}
                                                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                                    title="Restart"
                                                >
                                                    <RotateCcw className="w-5 h-5 text-white" />
                                                </button>
                                            )}
                                            
                                            {/* 5x indicator */}
                                            <AnimatePresence>
                                                {isOldPip && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -10 }}
                                                        className="text-sm text-orange-400 font-medium"
                                                    >
                                                        Old video playing at 5x speed
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Fullscreen button */}
                                        {fullscreenSupported && (
                                            <button
                                                onClick={toggleFullscreen}
                                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                                title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                                            >
                                                {isFullscreen ? (
                                                    <Minimize className="w-5 h-5 text-white" />
                                                ) : (
                                                    <Maximize className="w-5 h-5 text-white" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Labels below video */}
                            {!isPlaying && playState !== "ended" && (
                                <div className="flex justify-center gap-12 mt-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-white/60">45+ min of manual work</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className="text-white/60">Seconds with LINK</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
