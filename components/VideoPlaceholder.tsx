import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { useYouTubePlaylist } from '../hooks/useYouTube';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const VideoPlaceholder: React.FC<{ className?: string }> = ({ className }) => {
    const { videos, loading } = useYouTubePlaylist();
    const [muted, setMuted] = useState(true);
    const [videoReady, setVideoReady] = useState(false);
    const navigate = useNavigate();
    const { elementRef, isVisible } = useScrollAnimation();

    const latestVideo = videos.length > 0 ? videos[0] : null;

    const handleContainerClick = () => {
        if (latestVideo) {
            navigate('/football', { state: { playVideoId: latestVideo.id } });
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMuted(!muted);
    };

    if (loading || !latestVideo) {
        return (
            <div className={`bg-lando-card border border-white/10 ${className} flex items-center justify-center`}>
                <div className="text-timpview-orange font-mono text-xs animate-pulse">LOADING LATEST FEED...</div>
            </div>
        );
    }

    return (
        <div
            ref={elementRef as React.RefObject<HTMLDivElement>}
            className={`group relative bg-black border border-white/10 overflow-hidden cursor-pointer ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-700 ease-out`}
            onClick={handleContainerClick}
        >
            {/* 1. BACKGROUND IMAGE FALLBACK 
               If video fails to autoplay (mobile), this image shows instead of a black box.
               YouTube Thumbnails are usually at: https://img.youtube.com/vi/[ID]/maxresdefault.jpg
            */}
            <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
                style={{ backgroundImage: `url(${latestVideo.thumbnail || `https://img.youtube.com/vi/${latestVideo.id}/maxresdefault.jpg`})` }}
            />

            {/* Background Player */}
            <div className={`absolute inset-0 pointer-events-none scale-150 transition-opacity duration-1000 ${videoReady ? 'opacity-60 group-hover:opacity-40' : 'opacity-0'}`}>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${latestVideo.id}`} // Ensure standard URL format
                    width="100%"
                    height="100%"
                    playing={true}
                    loop={true}
                    muted={muted}
                    controls={false}
                    playsinline={true} // Critical for iOS
                    onReady={() => console.log('Player Ready')}
                    onStart={() => setVideoReady(true)} // Only show player once it starts moving
                    onError={(e) => {
                        console.error('Player Error', e);
                        setVideoReady(false); // Revert to image on error
                    }}
                    config={{
                        youtube: {
                            playerVars: {
                                showinfo: 0,
                                controls: 0,
                                disablekb: 1,
                                modestbranding: 1,
                                rel: 0, // Prevent related videos from other channels
                                origin: window.location.origin // Fixes CORS issues
                            }
                        }
                    }}
                />
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        {/* Only animate the dot if video is actually playing */}
                        <span className={`w-2 h-2 bg-red-500 rounded-full ${videoReady ? 'animate-pulse' : ''}`}></span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold">Latest Drop</span>
                    </div>

                    <button
                        onClick={toggleMute}
                        className="w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full border border-white/10 hover:border-timpview-orange hover:text-timpview-orange transition-all pointer-events-auto z-50"
                    >
                        {muted ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        )}
                    </button>
                </div>

                <div>
                    <h3 className="font-display font-black italic text-3xl uppercase text-white leading-none mb-2 line-clamp-2 drop-shadow-lg">
                        {latestVideo.title}
                    </h3>
                    <div className="inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                        <span className="text-xs font-mono text-timpview-orange uppercase tracking-wider">Watch Full Analysis</span>
                        <span className="text-timpview-orange">&rarr;</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlaceholder;
