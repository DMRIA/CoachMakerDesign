import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChatAssistant from '../components/ChatAssistant';
import FootballHero from '../components/FootballHero';
import VideoModal from '../components/VideoModal';
import { motion } from 'framer-motion';
import { DRILLS_PLAYLIST, Video } from '../data/playlist';

const FootballPage: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [watched, setWatched] = useState<Set<string>>(new Set());

    useEffect(() => {
        // Load preferences
        const savedFavs = localStorage.getItem('football_favorites');
        const savedWatched = localStorage.getItem('football_watched');
        if (savedFavs) setFavorites(new Set(JSON.parse(savedFavs)));
        if (savedWatched) setWatched(new Set(JSON.parse(savedWatched)));
    }, []);

    const toggleFavorite = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const newFavs = new Set(favorites);
        if (newFavs.has(id)) newFavs.delete(id);
        else newFavs.add(id);
        setFavorites(newFavs);
        localStorage.setItem('football_favorites', JSON.stringify([...newFavs]));
    };

    const markAsWatched = (id: string) => {
        const newWatched = new Set(watched);
        newWatched.add(id);
        setWatched(newWatched);
        localStorage.setItem('football_watched', JSON.stringify([...newWatched]));
    };

    const handleVideoClick = (video: Video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
        markAsWatched(video.id);
    };

    return (
        <div className="bg-lando-dark min-h-screen text-white overflow-x-hidden selection:bg-timpview-orange selection:text-black font-sans">
            <Navbar />

            {/* 1. Parallax Hero */}
            <FootballHero />

            {/* 2. Video Grid Section */}
            <main className="relative z-10 py-20 px-4 md:px-8 max-w-[1800px] mx-auto">

                {/* Hudl CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <motion.a
                        href="https://www.hudl.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="relative block w-full md:w-auto md:inline-block min-w-[300px] p-6 rounded-sm shadow-lg overflow-hidden group cursor-pointer"
                        initial="initial"
                        whileHover="hover"
                        animate="initial"
                        variants={{
                            initial: { scale: 1, y: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
                            hover: { scale: 1.02, y: -4, boxShadow: "0 20px 25px -5px rgba(234, 88, 12, 0.3)" }
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {/* Dynamic Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-timpview-orange to-red-600 z-0" />

                        {/* Animated Texture Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay z-0"
                            variants={{
                                initial: { scale: 1, opacity: 0.3 },
                                hover: { scale: 1.1, opacity: 0.4 }
                            }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Shine Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-10"
                            variants={{
                                initial: { x: '-150%' },
                                hover: { x: '150%' }
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />

                        {/* Content Container */}
                        <div className="relative z-20 flex flex-col items-start h-full justify-between gap-8">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    variants={{
                                        initial: { rotate: 0, scale: 1 },
                                        hover: { rotate: 180, scale: 1.1 }
                                    }}
                                    transition={{ duration: 0.4, type: "spring" }}
                                >
                                    <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                                    </svg>
                                </motion.div>
                                <span className="font-mono text-black font-bold tracking-widest text-xs uppercase">Official Playbook</span>
                            </div>

                            <div>
                                <h2 className="font-display font-black italic text-4xl text-black uppercase leading-[0.85]">
                                    ACCESS <br /> HUDL
                                </h2>
                            </div>

                            <motion.div
                                className="px-4 py-2 font-mono text-xs font-bold uppercase -skew-x-12 inline-flex items-center gap-2 bg-black text-white group-hover:bg-white group-hover:text-black transition-colors duration-300"
                            >
                                <span>Launch App</span>
                                <motion.span
                                    variants={{
                                        initial: { x: 0 },
                                        hover: { x: 4 }
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    &rarr;
                                </motion.span>
                            </motion.div>
                        </div>
                    </motion.a>
                </motion.div>

                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h2 className="font-display font-black italic text-4xl md:text-5xl uppercase text-white">
                            Drill <span className="text-timpview-orange">Sequence</span>
                        </h2>
                        <p className="text-gray-400 font-mono text-sm mt-2">
                            Access full coaching sessions and technical breakdowns.
                        </p>
                    </div>
                    <div className="text-right font-mono text-xs hidden md:block">
                        <div className="text-gray-500">DATABASE_STATUS</div>
                        <div className="text-timpview-orange animate-pulse">● ONLINE</div>
                        <div className="mt-1 text-gray-400">[{watched.size} WATCHED]</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {DRILLS_PLAYLIST.map((video, idx) => {
                        const isFavorite = favorites.has(video.id);
                        const isWatched = watched.has(video.id);

                        return (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -5 }}
                                onClick={() => handleVideoClick(video)}
                                className="group relative bg-black border border-white/10 overflow-hidden rounded-sm cursor-pointer shadow-lg hover:shadow-timpview-orange/20 transition-all duration-300"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                        alt={video.title}
                                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isWatched ? 'grayscale mix-blend-luminosity' : ''}`}
                                        onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg` }}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 bg-timpview-orange/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <svg className="w-6 h-6 text-black fill-current translate-x-0.5" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Duration Badge */}
                                    <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-sm">
                                        {video.duration}
                                    </div>

                                    {/* Watched Indicator */}
                                    {isWatched && (
                                        <div className="absolute top-2 left-2 bg-black/60 p-1 rounded-full">
                                            <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-4 relative bg-zinc-900">
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-timpview-orange/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Favorite Button */}
                                    <button
                                        onClick={(e) => toggleFavorite(e, video.id)}
                                        className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors z-20"
                                    >
                                        {isFavorite ? (
                                            <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        )}
                                    </button>

                                    <h3 className="font-bold text-sm uppercase leading-tight text-gray-200 group-hover:text-timpview-orange transition-colors pr-6 line-clamp-2 min-h-[2.5em]">
                                        {video.title}
                                    </h3>

                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-timpview-orange/50" />
                                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider truncate">
                                            {video.channel}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </main>

            {/* 3. Modal Player */}
            <VideoModal
                isOpen={isModalOpen}
                video={selectedVideo}
                onClose={() => setIsModalOpen(false)}
            />

            <ChatAssistant />

            {/* Global Background Texture */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>
        </div>
    );
};

export default FootballPage;
