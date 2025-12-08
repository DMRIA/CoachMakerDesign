import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'word' | 'char';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  delay = 0,
  duration = 0.5,
  type = 'char',
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  };

  if (type === 'word') {
    return (
      <motion.div
        style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={cn("flex flex-wrap", className)}
      >
        {words.map((word, index) => (
          <motion.span variants={child} style={{ marginRight: '0.25em' }} key={index}>
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // Character split
  const letters = Array.from(text);
  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("flex flex-wrap", className)}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
