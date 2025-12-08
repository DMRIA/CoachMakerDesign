import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FootballHero: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
                <img
                    src="/assets/football/20250728_202959.jpg"
                    alt="Football Background"
                    className="w-full h-full object-cover opacity-60"
                />
            </motion.div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

            {/* Content */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]), scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.8]) }}
                className="relative z-20 text-center px-4"
            >
                <div className="inline-block py-1 px-3 border border-timpview-orange/50 rounded-full bg-timpview-orange/10 mb-6 backdrop-blur-sm">
                    <span className="font-mono text-xs text-timpview-orange uppercase tracking-widest">Timpview Football // 2025</span>
                </div>

                <h1 className="font-display font-black italic text-6xl md:text-8xl text-white uppercase leading-[0.8]">
                    Defensive <br />
                    <span className="text-transparent text-stroke">Playbook</span>
                </h1>

                <p className="mt-6 text-gray-400 font-mono text-sm uppercase tracking-wider max-w-lg mx-auto">
                    Master the technique. Dominate the trenches. <br />
                    Curated drills and film study for elite linemen.
                </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest animate-pulse">Scroll to Access</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-timpview-orange to-transparent" />
            </motion.div>
        </section>
    );
};

export default FootballHero;
