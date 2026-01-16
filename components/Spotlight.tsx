"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Spotlight() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the spotlight movement
    const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-50 mix-blend-soft-light"
            style={{
                background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(255,255,255,0.15), transparent 40%)`,
            }}
        />
    );
}
