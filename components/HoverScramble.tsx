import React, { useState, useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface HoverScrambleProps {
    text: string;
    className?: string;
    duration?: number;
    speed?: number;
    characterSet?: string;
}

export const HoverScramble: React.FC<HoverScrambleProps> = ({
    text,
    className,
    duration = 0.5,
    speed = 50,
    characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const scramble = () => {
        let iteration = 0;
        const maxIterations = text.length;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = window.setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characterSet[Math.floor(Math.random() * characterSet.length)];
                    })
                    .join('')
            );

            if (iteration >= maxIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3; // Slow down the resolution
        }, speed);
    };

    const stopScramble = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    };

    useEffect(() => {
        if (isHovering) {
            scramble();
        } else {
            stopScramble();
        }
        return () => stopScramble();
    }, [isHovering]);

    return (
        <span
            className={cn("inline-block cursor-pointer font-mono", className)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {displayText}
        </span>
    );
};
