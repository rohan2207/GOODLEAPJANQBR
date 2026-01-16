// Shared motion system for LinkAI
// Use these constants across the entire site for consistent animations

// The signature easing curve - smooth with slight overshoot
export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

// Standard durations
export const MOTION_DURATION = {
    fast: 0.4,
    normal: 0.6,
    slow: 0.7,
} as const;

// Reusable animation variants for Framer Motion
export const fadeInUp = {
    initial: { 
        opacity: 0, 
        y: 16, 
        filter: "blur(6px)" 
    },
    animate: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)" 
    },
    exit: { 
        opacity: 0, 
        y: -8, 
        filter: "blur(4px)" 
    },
    transition: {
        duration: MOTION_DURATION.normal,
        ease: MOTION_EASE,
    },
};

export const fadeInScale = {
    initial: { 
        opacity: 0, 
        scale: 0.96, 
        filter: "blur(6px)" 
    },
    animate: { 
        opacity: 1, 
        scale: 1, 
        filter: "blur(0px)" 
    },
    exit: { 
        opacity: 0, 
        scale: 1.03, 
        filter: "blur(8px)" 
    },
    transition: {
        duration: MOTION_DURATION.normal,
        ease: MOTION_EASE,
    },
};

export const fadeInLeft = {
    initial: { 
        opacity: 0, 
        x: -20, 
        filter: "blur(4px)" 
    },
    animate: { 
        opacity: 1, 
        x: 0, 
        filter: "blur(0px)" 
    },
    transition: {
        duration: MOTION_DURATION.normal,
        ease: MOTION_EASE,
    },
};

export const fadeInRight = {
    initial: { 
        opacity: 0, 
        x: 20, 
        filter: "blur(4px)" 
    },
    animate: { 
        opacity: 1, 
        x: 0, 
        filter: "blur(0px)" 
    },
    transition: {
        duration: MOTION_DURATION.normal,
        ease: MOTION_EASE,
    },
};

// Stagger children animation
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// For section headers
export const sectionHeader = {
    initial: { 
        opacity: 0, 
        y: 24, 
        filter: "blur(8px)" 
    },
    whileInView: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)" 
    },
    viewport: { once: true, margin: "-100px" },
    transition: {
        duration: MOTION_DURATION.slow,
        ease: MOTION_EASE,
    },
};

// For feature cards
export const featureCard = {
    initial: { 
        opacity: 0, 
        y: 20, 
        scale: 0.98 
    },
    whileInView: { 
        opacity: 1, 
        y: 0, 
        scale: 1 
    },
    viewport: { once: true, margin: "-50px" },
    transition: {
        duration: MOTION_DURATION.normal,
        ease: MOTION_EASE,
    },
};

// For images/screenshots
export const imageReveal = {
    initial: { 
        opacity: 0, 
        scale: 0.95, 
        filter: "blur(10px)" 
    },
    whileInView: { 
        opacity: 1, 
        scale: 1, 
        filter: "blur(0px)" 
    },
    viewport: { once: true, margin: "-100px" },
    transition: {
        duration: MOTION_DURATION.slow,
        ease: MOTION_EASE,
    },
};

// Helper to create custom transitions
export function createTransition(duration = MOTION_DURATION.normal, delay = 0) {
    return {
        duration,
        delay,
        ease: MOTION_EASE,
    };
}

// Helper to create staggered delays
export function staggerDelay(index: number, baseDelay = 0.1) {
    return index * baseDelay;
}
