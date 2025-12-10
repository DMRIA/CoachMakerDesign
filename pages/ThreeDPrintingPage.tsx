import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import Navbar from '../components/Navbar';

const ThreeDPrintingPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Mouse parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    };

    const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 20 });

    const braceX = useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]);
    const braceY = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);

    const gunX = useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]);
    const gunY = useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]);

    const targetsX = useTransform(mouseXSpring, [-0.5, 0.5], [60, -60]);
    const targetsY = useTransform(mouseYSpring, [-0.5, 0.5], [30, -30]);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-timpview-orange selection:text-black font-sans relative"
            onMouseMove={handleMouseMove}
        >
            <Navbar />

            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Main Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                {/* Radial gradient for spotlight effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(249,115,22,0.15),_transparent_70%)]"></div>
            </div>

            {/* Floating Parallax Elements (Exploded View) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Leg Brace - Top Right */}
                <motion.div
                    style={{ x: braceX, y: braceY }}
                    className="absolute top-[-5%] right-[-10%] w-[50vw] opacity-40 blur-[2px] rotate-12 mix-blend-screen"
                >
                    <img src="/assets/leg_brace.png" alt="" className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
                </motion.div>

                {/* Airsoft Gun - Bottom Left */}
                <motion.div
                    style={{ x: gunX, y: gunY }}
                    className="absolute bottom-[-10%] left-[-15%] w-[60vw] opacity-30 blur-[1px] -rotate-12 mix-blend-screen"
                >
                    <img src="/assets/airsoft_gun.png" alt="" className="w-full h-auto drop-shadow-[0_0_30px_rgba(249,115,22,0.1)]" />
                </motion.div>

                {/* Targets - Center Background */}
                <motion.div
                    style={{ x: targetsX, y: targetsY }}
                    className="absolute top-[20%] left-[30%] w-[40vw] opacity-10 blur-[4px]"
                >
                    <img src="/assets/cones_targets.png" alt="" className="w-full h-auto" />
                </motion.div>
            </div>

            <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-80px)] flex flex-col justify-center">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Text Content */}
                    <div className="lg:col-span-7 space-y-8 relative">
                        {/* Decorative Line */}
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="absolute -left-6 top-0 w-[1px] bg-gradient-to-b from-transparent via-timpview-orange to-transparent opacity-50"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="flex items-center gap-3 text-timpview-orange font-mono text-sm tracking-[0.2em] uppercase mb-4">
                                <span className="w-4 h-[1px] bg-timpview-orange"></span>
                                Engineering & Design
                            </h2>
                            <h1 className="font-display font-black italic text-6xl md:text-8xl uppercase leading-[0.85] text-white my-6">
                                <motion.span
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="block"
                                >
                                    Maker
                                </motion.span>
                                <motion.span
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="block text-transparent text-stroke-white opacity-80"
                                >
                                    World
                                </motion.span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-lg md:text-xl text-gray-300 leading-relaxed font-light max-w-2xl bg-black/40 backdrop-blur-md p-6 border-l-2 border-timpview-orange/50"
                        >
                            Explosive innovation meets precision engineering. For over <strong className="text-white">12 years</strong> at <span className="text-timpview-orange">Action Target</span>, I've been reinventing design methods and aligning departments to build awe-inspiring shooting ranges.
                        </motion.p>

                        {/* Interactive Skills Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="space-y-4 pt-4"
                        >
                            <h3 className="font-bold text-gray-500 uppercase tracking-wider text-xs">Core Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Revit', 'Fusion 360', 'AutoCAD', 'Rapid Prototyping', 'Design Systems'].map((skill, i) => (
                                    <motion.span
                                        key={skill}
                                        whileHover={{ scale: 1.05, borderColor: "rgba(249,115,22,0.8)", backgroundColor: "rgba(249,115,22,0.1)" }}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm backdrop-blur-sm text-sm font-mono text-gray-300 transition-colors cursor-crosshair"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="pt-8"
                        >
                            <a
                                href="https://makerworld.com/en/@user_3196040701"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-4 px-8 py-4 overflow-hidden bg-white text-black font-black text-lg uppercase tracking-wider clip-path-slant"
                            >
                                <span className="flex-1 relative z-10 transition-colors group-hover:text-white">Visit MakerWorld</span>
                                <div className="absolute inset-0 bg-timpview-orange transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 transform group-hover:translate-x-1 transition-transform group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m-4-4H3" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Side Visuals / Stats Glass Card */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="relative z-10"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-timpview-orange to-purple-600 rounded-sm blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="bg-black/60 border border-white/10 backdrop-blur-xl p-8 rounded-sm relative overflow-hidden">
                                {/* Shine effect */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none"></div>

                                <div className="flex items-baseline justify-between mb-8 border-b border-white/10 pb-4">
                                    <h3 className="font-display font-bold italic text-3xl uppercase text-white">
                                        Stats
                                    </h3>
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between group">
                                        <span className="font-mono text-sm text-gray-400 group-hover:text-white transition-colors">Experience</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-display font-black text-4xl text-white">12</span>
                                            <span className="text-timpview-orange font-bold">+ Years</span>
                                        </div>
                                    </div>

                                    <div className="w-full h-[1px] bg-white/5"></div>

                                    <div className="flex items-center justify-between group">
                                        <span className="font-mono text-sm text-gray-400 group-hover:text-white transition-colors">Specialty</span>
                                        <div className="text-right">
                                            <span className="block font-bold text-white">Custom Ranges</span>
                                            <span className="text-xs font-mono text-gray-500">Design & Build</span>
                                        </div>
                                    </div>

                                    <div className="w-full h-[1px] bg-white/5"></div>

                                    <div className="flex items-center justify-between group">
                                        <span className="font-mono text-sm text-gray-400 group-hover:text-white transition-colors">Location</span>
                                        <div className="text-right">
                                            <span className="block font-bold text-white">Action Target</span>
                                            <span className="text-xs font-mono text-gray-500">Provo, UT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>



                {/* Project Gallery Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mt-20 lg:mt-32"
                >
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h3 className="font-display font-bold italic text-3xl uppercase text-white">
                            Project <span className="text-timpview-orange">Gallery</span>
                        </h3>
                        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400">
                            <div className="w-2 h-2 rounded-full bg-timpview-orange animate-pulse"></div>
                            DRAG TO EXPLORE
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing">
                        {/* Gradient masks for smooth fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                        <motion.div
                            className="flex gap-6 px-12"
                            drag="x"
                            dragConstraints={{ right: 0, left: -600 }} // You might need to adjust this depending on content width
                        >
                            {Object.entries(import.meta.glob('../project-gallery/*.{png,jpg,jpeg,webp}', { eager: true })).map(([path, module]: any, index) => {
                                const src = module.default;
                                const filename = path.split('/').pop()?.split('.')[0]?.replace(/_/g, ' ') || 'Project';

                                return (
                                    <motion.div
                                        key={path}
                                        whileHover={{ scale: 1.05, y: -10 }}
                                        className="relative min-w-[280px] md:min-w-[320px] aspect-[4/3] rounded-sm overflow-hidden group border border-white/10 bg-white/5"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10"></div>
                                        <img
                                            src={src}
                                            alt={filename}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            draggable="false"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <div className="text-xs font-mono text-timpview-orange mb-1">PROTO_0{index + 1}</div>
                                            <div className="font-bold text-white uppercase text-sm">{filename}</div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </motion.div>

            </main>
        </div>
    );
};

export default ThreeDPrintingPage;
