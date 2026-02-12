"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, RefreshCw, Volume2, VolumeX } from 'lucide-react';

// Scene Components (Placeholders - to be implemented/imported)
const SceneIntro = ({ isActive }: { isActive: boolean }) => (
    <div className="flex flex-col items-center justify-center h-full text-center px-20">
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-white mb-6"
        >
            LinkAI
        </motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-white/60"
        >
            Three Month Progress Report
        </motion.p>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-4"
        >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                SH
            </div>
            <div className="text-left">
                <p className="text-white font-semibold text-lg">Steve Hulme</p>
                <p className="text-white/40">Operations Executive, Mortgage Tech</p>
            </div>
        </motion.div>
    </div>
);

// Configuration for scenes
const SCENES = [
    { id: 'intro', duration: 15, component: SceneIntro, label: "Intro" },
    { id: 'context', duration: 20, component: () => <div className="text-white text-4xl">Context: Technology Revolution</div>, label: "Context" },
    { id: 'demo-workspace', duration: 45, component: () => <div className="text-white text-4xl">Demo: Integrated Workspace</div>, label: "Demo" },
    { id: 'last-mile', duration: 30, component: () => <div className="text-white text-4xl">The Last Mile</div>, label: "Last Mile" },
    { id: 'wrap-up', duration: 13, component: () => <div className="text-white text-4xl">Wrap Up & Beta</div>, label: "Wrap Up" },
    { id: 'roadmap', duration: 40, component: () => <div className="text-white text-4xl">Roadmap & Close</div>, label: "Roadmap" },
];

const TOTAL_DURATION = SCENES.reduce((acc, scene) => acc + scene.duration, 0);

export default function PresentationPage() {
    const [isPlaying, setIsPlaying] = useState(false); // Start paused for checking
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const requestRef = useRef<number | undefined>(undefined);
    const startTimeRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number>(0);

    // Main Timer Loop
    const animate = (time: number) => {
        if (!startTimeRef.current) startTimeRef.current = time;

        // Calculate raw elapsed time since start of *this* playback segment
        const timeSinceStart = time - startTimeRef.current;

        // Add to the previously accumulated time
        let newTime = previousTimeRef.current + (timeSinceStart / 1000); // Convert to seconds

        if (newTime >= TOTAL_DURATION) {
            newTime = TOTAL_DURATION;
            setIsPlaying(false);
        }

        setCurrentTime(newTime);

        if (isPlaying && newTime < TOTAL_DURATION) {
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            startTimeRef.current = null; // Reset segment start time
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            previousTimeRef.current = currentTime; // Save current progress
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPlaying]);

    // Determine current scene based on time
    useEffect(() => {
        let accumulatedTime = 0;
        let foundIndex = 0;

        for (let i = 0; i < SCENES.length; i++) {
            if (currentTime < accumulatedTime + SCENES[i].duration) {
                foundIndex = i;
                break;
            }
            accumulatedTime += SCENES[i].duration;
            // If we are at the very end, stay on last scene
            if (i === SCENES.length - 1 && currentTime >= TOTAL_DURATION) {
                foundIndex = i;
            }
        }
        setCurrentSceneIndex(foundIndex);
    }, [currentTime]);

    const handleSeek = (time: number) => {
        setCurrentTime(time);
        previousTimeRef.current = time;
        if (!isPlaying) {
            // Force scene update immediately even if paused
            let accumulatedTime = 0;
            let foundIndex = 0;
            for (let i = 0; i < SCENES.length; i++) {
                if (time < accumulatedTime + SCENES[i].duration) {
                    foundIndex = i;
                    break;
                }
                accumulatedTime += SCENES[i].duration;
            }
            setCurrentSceneIndex(foundIndex);
        }
    };

    const togglePlay = () => setIsPlaying(!isPlaying);
    const restart = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        previousTimeRef.current = 0;
        setCurrentSceneIndex(0);
    };

    const CurrentSceneComponent = SCENES[currentSceneIndex].component;
    // Calculate progress within current scene for internal animations
    const sceneStartTime = SCENES.slice(0, currentSceneIndex).reduce((acc, s) => acc + s.duration, 0);
    const sceneProgress = (currentTime - sceneStartTime) / SCENES[currentSceneIndex].duration;


    return (
        <main className="w-full h-screen bg-black overflow-hidden flex flex-col relative text-white font-sans selection:bg-purple-500/30">

            {/* Main Stage */}
            <div className="flex-1 relative w-full h-full overflow-hidden">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={SCENES[currentSceneIndex].id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Render Scene */}
                        <div className="w-full h-full flex items-center justify-center p-8 md:p-16">
                            <CurrentSceneComponent isActive={isPlaying} />
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls & Progress */}
            <div className="h-24 bg-zinc-900/50 backdrop-blur-md border-t border-white/10 flex flex-col px-8 pb-6 justify-center z-50">
                {/* Global Timeline */}
                <div
                    className="w-full h-2 bg-white/10 rounded-full mb-4 relative cursor-pointer group"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        handleSeek(percent * TOTAL_DURATION);
                    }}
                >
                    {/* Scene Markers */}
                    {SCENES.reduce((acc, scene, i) => {
                        const startPercent = (acc.time / TOTAL_DURATION) * 100;
                        acc.markers.push(
                            <div
                                key={i}
                                className="absolute top-0 bottom-0 w-0.5 bg-white/20 h-4 -mt-1 group-hover:h-6 group-hover:-mt-2 transition-all"
                                style={{ left: `${startPercent}%` }}
                            >
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/50 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                    {scene.label}
                                </span>
                            </div>
                        );
                        acc.time += scene.duration;
                        return acc;
                    }, { time: 0, markers: [] } as { time: number, markers: JSX.Element[] }).markers}

                    {/* Progress Bar */}
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
                    />
                    {/* Scrubber Knob */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"
                        style={{ left: `${(currentTime / TOTAL_DURATION) * 100}%` }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-1" />}
                        </button>

                        <div className="flex items-center gap-2">
                            <button onClick={restart} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <RefreshCw className="w-4 h-4 text-white/70" />
                            </button>
                        </div>

                        <span className="text-sm font-mono text-white/70">
                            {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-white/50 font-medium tracking-widest uppercase">
                            {SCENES[currentSceneIndex].label}
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
}

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}
