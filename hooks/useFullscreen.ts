"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

interface UseFullscreenReturn {
    isFullscreen: boolean;
    toggle: () => Promise<void>;
    enter: () => Promise<void>;
    exit: () => Promise<void>;
    isSupported: boolean;
}

export function useFullscreen(elementRef: RefObject<HTMLElement | null>): UseFullscreenReturn {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    // Check if fullscreen is supported
    useEffect(() => {
        setIsSupported(
            typeof document !== "undefined" &&
            (document.fullscreenEnabled ||
                (document as any).webkitFullscreenEnabled ||
                (document as any).mozFullScreenEnabled ||
                (document as any).msFullscreenEnabled)
        );
    }, []);

    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            const fullscreenElement =
                document.fullscreenElement ||
                (document as any).webkitFullscreenElement ||
                (document as any).mozFullScreenElement ||
                (document as any).msFullscreenElement;
            
            setIsFullscreen(!!fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
        };
    }, []);

    const enter = useCallback(async () => {
        const element = elementRef.current;
        if (!element) return;

        try {
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if ((element as any).webkitRequestFullscreen) {
                await (element as any).webkitRequestFullscreen();
            } else if ((element as any).mozRequestFullScreen) {
                await (element as any).mozRequestFullScreen();
            } else if ((element as any).msRequestFullscreen) {
                await (element as any).msRequestFullscreen();
            }
        } catch (error) {
            console.error("Failed to enter fullscreen:", error);
        }
    }, [elementRef]);

    const exit = useCallback(async () => {
        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                await (document as any).webkitExitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                await (document as any).mozCancelFullScreen();
            } else if ((document as any).msExitFullscreen) {
                await (document as any).msExitFullscreen();
            }
        } catch (error) {
            console.error("Failed to exit fullscreen:", error);
        }
    }, []);

    const toggle = useCallback(async () => {
        if (isFullscreen) {
            await exit();
        } else {
            await enter();
        }
    }, [isFullscreen, enter, exit]);

    return { isFullscreen, toggle, enter, exit, isSupported };
}
