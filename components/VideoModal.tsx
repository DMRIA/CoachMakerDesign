import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';
import { Video } from '../data/playlist';

interface VideoModalProps {
    video: Video | null;
    onClose: () => void;
    isOpen: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, isOpen }) => {
    if (!video) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-6xl aspect-video bg-black border border-white/10 rounded-sm shadow-2xl relative overflow-hidden group"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-timpview-orange text-white rounded-full transition-colors backdrop-blur-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Tech Borders */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/20 z-20 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/20 z-20 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/20 z-20 pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/20 z-20 pointer-events-none" />

                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${video.id}`}
                                width="100%"
                                height="100%"
                                controls={true}
                                playing={true}
                                config={{
                                    youtube: {
                                        playerVars: { showinfo: 1, autoplay: 1 }
                                    }
                                }}
                            />

                            {/* Metadata Overlay (Fades out when playing usually, kept minimal) */}
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-6 pointer-events-none">
                                <h3 className="font-display font-bold italic text-2xl text-white uppercase">{video.title}</h3>
                                <div className="flex gap-4 mt-2 font-mono text-xs text-timpview-orange">
                                    <span>{video.channel}</span>
                                    <span>//</span>
                                    <span>{video.duration}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default VideoModal;
