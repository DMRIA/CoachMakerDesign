import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ScrollTextProps {
    children: React.ReactNode;
    className?: string;
    speed?: number; // Parallax speed, 0 is no movement, 1 is normal scroll, >1 is faster
    direction?: 'up' | 'down' | 'left' | 'right';
    fade?: boolean;
}

export const ScrollText: React.FC<ScrollTextProps> = ({
    children,
    className,
    speed = 0.5,
    direction = 'up',
    fade = true,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yRange = direction === 'up' ? [100, -100] : direction === 'down' ? [-100, 100] : [0, 0];
    const xRange = direction === 'left' ? [100, -100] : direction === 'right' ? [-100, 100] : [0, 0];

    const y = useTransform(scrollYProgress, [0, 1], [yRange[0] * speed, yRange[1] * speed]);
    const x = useTransform(scrollYProgress, [0, 1], [xRange[0] * speed, xRange[1] * speed]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{
                y: direction === 'up' || direction === 'down' ? y : 0,
                x: direction === 'left' || direction === 'right' ? x : 0,
                opacity: fade ? opacity : 1
            }}
            className={cn("relative", className)}
        >
            {children}
        </motion.div>
    );
};
