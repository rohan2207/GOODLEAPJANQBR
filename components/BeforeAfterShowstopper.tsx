"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Maximize, Minimize, Loader2 } from "lucide-react";
import { useFullscreen } from "@/hooks/useFullscreen";

// Types
type PlayState = "teaser" | "idle" | "ready" | "playingSplit" | "playingPip" | "ended" | "error";

interface BeforeAfterShowstopperProps {
    oldSrc: string;
    newSrc?: string;
    oldStartMode?: "half" | "seconds";
    oldStartSeconds?: number;
    pipDelaySeconds?: number; // Time before transitioning to PiP (default 5)
    testDuration?: number; // For testing without new video, simulate a duration (seconds)
}

export default function BeforeAfterShowstopper({
    oldSrc,
    newSrc,
    oldStartMode = "half",
    oldStartSeconds = 0,
    pipDelaySeconds = 5,
    testDuration = 180, // Default 3 minutes for testing
}: BeforeAfterShowstopperProps) {
    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const oldVideoRef = useRef<HTMLVideoElement>(null);
    const newVideoRef = useRef<HTMLVideoElement>(null);
    const syncIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const pipTimerRef = useRef<NodeJS.Timeout | null>(null);
    const testTimerRef = useRef<NodeJS.Timeout | null>(null);

    // State
    const [playState, setPlayState] = useState<PlayState>("teaser");
    const [oldDuration, setOldDuration] = useState(0);
    const [oldReady, setOldReady] = useState(false);
    const [newReady, setNewReady] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [oldStartTime, setOldStartTime] = useState(0);
    const [oldCurrentTime, setOldCurrentTime] = useState(0);
    const [newCurrentTime, setNewCurrentTime] = useState(0);

    // Check if we have a new video
    const hasNewVideo = !!newSrc;

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

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

    // Intersection Observer for teaser trigger - only when section is actually visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    }
                });
            },
            { rootMargin: "0px", threshold: 0.5 } // Only trigger when 50% visible
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
                setPlayState("idle");
            }, 2500); // 2.5 second teaser

            return () => clearTimeout(timer);
        }
    }, [playState, isInView]);

    // Videos auto-load with preload="auto" - no manual load() needed
    // Manual load() calls can interrupt play() and cause AbortError

    // Check if ready to play - ready when old video is loaded (new video optional)
    useEffect(() => {
        if (playState === "idle" && oldReady && (newReady || !hasNewVideo)) {
            setPlayState("ready");
        }
    }, [playState, oldReady, newReady, hasNewVideo]);

    // Handle old video metadata
    const handleOldLoadedMetadata = useCallback(() => {
        if (oldVideoRef.current) {
            setOldDuration(oldVideoRef.current.duration);
        }
    }, []);

    // Handle new video metadata (duration tracked internally by video element)
    const handleNewLoadedMetadata = useCallback(() => {
        // New video metadata loaded - duration available via newVideoRef.current.duration if needed
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
        if (testTimerRef.current) {
            clearTimeout(testTimerRef.current);
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

        if (!oldVideo) {
            console.error("Old video ref not available");
            return;
        }

        try {
            // Calculate and set old video start time (use 0 if duration not available)
            const duration = oldVideo.duration;
            const startTime = duration && !isNaN(duration) && duration > 0 ? calculateOldStartTime() : 0;
            setOldStartTime(startTime);
            
            // Set start positions
            oldVideo.currentTime = startTime;
            if (hasNewVideo && newVideo) {
                newVideo.currentTime = 0;
            }
            
            // Start playback
            setPlayState("playingSplit");

            if (hasNewVideo && newVideo) {
                // Play both videos - use catch to handle AbortError gracefully
                const playOld = oldVideo.play().catch(e => {
                    if (e.name !== 'AbortError') throw e;
                });
                const playNew = newVideo.play().catch(e => {
                    if (e.name !== 'AbortError') throw e;
                });
                await Promise.all([playOld, playNew]);
                
                // Start sync loop
                startSyncLoop();
            } else {
                // No new video - just play old video
                await oldVideo.play().catch(e => {
                    if (e.name !== 'AbortError') throw e;
                });
                
                // Set up test end timer (simulate new video ending)
                testTimerRef.current = setTimeout(() => {
                    if (oldVideo) {
                        oldVideo.pause();
                        oldVideo.playbackRate = 1;
                    }
                    setPlayState("ended");
                }, testDuration * 1000);
            }

            // Set timer for PiP transition
            pipTimerRef.current = setTimeout(() => {
                if (oldVideo) {
                    oldVideo.playbackRate = 10; // 10x speed for old video
                }
                setPlayState("playingPip");
            }, pipDelaySeconds * 1000);

        } catch (error) {
            console.error("Failed to play videos:", error);
            setErrorMessage("Failed to play videos. Please try again.");
            setPlayState("error");
        }
    }, [playState, calculateOldStartTime, startSyncLoop, pipDelaySeconds, hasNewVideo, testDuration]);

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
        if (testTimerRef.current) {
            clearTimeout(testTimerRef.current);
        }

        setPlayState("ready");
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
            if (pipTimerRef.current) clearTimeout(pipTimerRef.current);
            if (testTimerRef.current) clearTimeout(testTimerRef.current);
        };
    }, []);

    // Track video timestamps during playback
    useEffect(() => {
        if (playState !== "playingSplit" && playState !== "playingPip") return;

        const updateTimes = () => {
            if (oldVideoRef.current) {
                setOldCurrentTime(oldVideoRef.current.currentTime);
            }
            if (newVideoRef.current) {
                setNewCurrentTime(newVideoRef.current.currentTime);
            }
        };

        // Update every 100ms for smooth display
        const interval = setInterval(updateTimes, 100);
        updateTimes(); // Initial update

        return () => clearInterval(interval);
    }, [playState]);

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

                            {/* Video Stage - Larger container */}
                            <div 
                                ref={stageRef}
                                className={`relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-xl ${
                                    isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'aspect-video min-h-[500px] md:min-h-[600px] lg:min-h-[700px]'
                                }`}
                            >
                                {/* Main Video Container */}
                                <div className="relative w-full h-full">
                                    
                                    {/* NEW Video - Takes full space in PiP mode */}
                                    <div className={`absolute inset-0 ${isOldPip ? 'z-10' : 'right-0 left-1/2'} bg-slate-900 transition-all duration-500`}>
                                        {/* NEW Label */}
                                        <div className="absolute top-4 right-4 z-20 px-4 py-2 rounded-xl bg-emerald-500/90 backdrop-blur-sm">
                                            <span className="font-semibold text-white">The New Way</span>
                                        </div>

                                        {/* NEW Timestamp - Big and prominent */}
                                        <AnimatePresence>
                                            {isPlaying && hasNewVideo && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20"
                                                >
                                                    <div className="bg-black/60 backdrop-blur-md px-8 py-4 rounded-2xl border border-emerald-500/30">
                                                        <p className="text-emerald-400 text-sm font-medium text-center mb-1">Elapsed Time</p>
                                                        <p className="text-white text-5xl md:text-6xl font-mono font-bold tracking-wider">
                                                            {formatTime(newCurrentTime)}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* GoodLeap Benefit Message - appears in PiP mode */}
                                        <AnimatePresence>
                                            {isOldPip && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ delay: 0.5, duration: 0.6 }}
                                                    className="absolute top-1/2 right-8 -translate-y-1/2 z-20 max-w-md"
                                                >
                                                    <div className="bg-gradient-to-br from-black/80 via-black/70 to-emerald-950/50 backdrop-blur-xl p-8 rounded-3xl border border-emerald-500/20 shadow-2xl">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">First 30 Seconds</p>
                                                                <p className="text-white font-bold text-lg">Loan Benefits Ready</p>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                    <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                                <p className="text-white/80 text-sm">GoodLeap Consumer Finance loan options instantly calculated</p>
                                                            </div>
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                    <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                                <p className="text-white/80 text-sm">Personalized rates & payment scenarios</p>
                                                            </div>
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                    <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                                <p className="text-white/80 text-sm">Ready to present to customer immediately</p>
                                                            </div>
                                                        </div>
                                                        <div className="mt-5 pt-4 border-t border-white/10">
                                                            <p className="text-emerald-400/80 text-xs text-center">
                                                                While the old process is still loading at 10x speed...
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {hasNewVideo ? (
                                            <video
                                                ref={newVideoRef}
                                                src={newSrc}
                                                className="w-full h-full object-cover"
                                                preload="auto"
                                                muted
                                                playsInline
                                                crossOrigin="anonymous"
                                                onLoadedMetadata={handleNewLoadedMetadata}
                                                onCanPlayThrough={handleNewCanPlay}
                                                onError={handleVideoError("new")}
                                                onEnded={handleNewVideoEnded}
                                            />
                                        ) : (
                                            /* Animated placeholder for new video area */
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-950/50 to-slate-900 relative overflow-hidden">
                                                {/* Animated gradient background */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5 animate-pulse" />
                                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                                                </div>
                                                
                                                {/* Content */}
                                                <div className="relative text-center p-8">
                                                    {isPlaying ? (
                                                        /* During playback - show preview message */
                                                        <>
                                                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                                                <motion.div
                                                                    animate={{ scale: [1, 1.1, 1] }}
                                                                    transition={{ duration: 2, repeat: Infinity }}
                                                                >
                                                                    <Play className="w-10 h-10 text-emerald-400" />
                                                                </motion.div>
                                                            </div>
                                                            <p className="text-emerald-300 text-xl font-semibold mb-2">
                                                                LINK&apos;s New Experience
                                                            </p>
                                                            <p className="text-white/40 text-sm max-w-xs mx-auto">
                                                                Imagine completing this workflow in seconds...
                                                            </p>
                                                        </>
                                                    ) : (
                                                        /* Before playback - show coming soon */
                                                        <>
                                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                                                                <Play className="w-8 h-8 text-white/40" />
                                                            </div>
                                                            <p className="text-white/60 text-lg font-medium mb-2">
                                                                New experience video
                                                            </p>
                                                            <p className="text-white/40 text-sm">
                                                                Coming soon
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* OLD Video - Left half in split, PiP overlay when in PiP mode */}
                                    <div className={`${
                                        isOldPip 
                                            ? 'absolute top-6 left-6 z-40 w-80 aspect-video rounded-2xl overflow-hidden ring-4 ring-red-500/50 shadow-2xl shadow-red-500/20' 
                                            : 'absolute inset-0 right-1/2 z-10'
                                    } transition-all duration-700 ease-out`}>
                                        {/* OLD Label */}
                                        <div className={`absolute top-3 left-3 z-20 px-3 py-1.5 rounded-lg bg-red-500/90 backdrop-blur-sm ${isOldPip ? 'text-xs' : 'text-sm'}`}>
                                            <span className="font-semibold text-white">The Old Way</span>
                                        </div>

                                        {/* 10x Speed Badge */}
                                        <AnimatePresence>
                                            {isOldPip && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-sm font-bold flex items-center gap-1"
                                                >
                                                    ⚡ 10x SPEED
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* OLD Timestamp - Prominent in PiP mode */}
                                        <AnimatePresence>
                                            {isOldPip && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute bottom-3 left-3 right-3 z-20"
                                                >
                                                    <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-xl">
                                                        <p className="text-red-400 text-xs font-medium mb-0.5">Old Way Time</p>
                                                        <p className="text-white text-2xl font-mono font-bold">
                                                            {formatTime(oldCurrentTime)}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <video
                                            ref={oldVideoRef}
                                            src={oldSrc}
                                            className="w-full h-full object-cover"
                                            preload="auto"
                                            muted
                                            playsInline
                                            crossOrigin="anonymous"
                                            onLoadedMetadata={handleOldLoadedMetadata}
                                            onCanPlayThrough={handleOldCanPlay}
                                            onError={handleVideoError("old")}
                                        />
                                    </div>
                                </div>

                                {/* Central Play Button Overlay */}
                                <AnimatePresence>
                                    {playState === "ready" && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                                        >
                                            <motion.button
                                                onClick={handlePlay}
                                                className="group relative flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 transition-all"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/30 group-hover:bg-white/40">
                                                    <Play className="w-8 h-8 ml-1 text-white" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-lg font-semibold text-white">
                                                        Watch the Difference
                                                    </p>
                                                    <p className="text-sm text-white/60">
                                                        {hasNewVideo ? "Side by side comparison" : "Experience the transformation"}
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

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
