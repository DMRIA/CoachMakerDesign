import React from 'react';
import { GridItemProps } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const GridItem: React.FC<GridItemProps> = ({ title, subtitle, description, imageUrl, className, link, tags, accentColor = 'neon' }) => {
    const { elementRef, isVisible } = useScrollAnimation();

    const colors = {
        neon: 'text-timpview-orange',
        orange: 'text-timpview-orange',
        blue: 'text-timpview-blue',
        white: 'text-white',
    };

    const borders = {
        neon: 'group-hover:border-timpview-orange',
        orange: 'group-hover:border-timpview-orange',
        blue: 'group-hover:border-timpview-blue',
        white: 'group-hover:border-white',
    };

    return (
        <a
            ref={elementRef as React.RefObject<HTMLAnchorElement>}
            href={link}
            target={link?.startsWith('#') ? '_self' : '_blank'}
            rel="noreferrer"
            className={`group relative block h-full bg-lando-card overflow-hidden border border-white/10 ${borders[accentColor]} ${className} transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%)' }}
        >
            {imageUrl && (
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-lando-dark/60 z-10 group-hover:opacity-40 transition-opacity duration-500 mix-blend-multiply"></div>
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                </div>
            )}

            {/* Content Overlay */}
            <div className="relative z-20 h-full flex flex-col justify-between p-8">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1 bg-black/80 backdrop-blur-md border border-white/20 ${colors[accentColor]}`}>
                        {subtitle}
                    </div>
                    <div className="w-2 h-2 bg-white/20 rounded-full group-hover:bg-white transition-colors"></div>
                </div>

                {/* Main Text */}
                <div className="mt-auto">
                    <h3 className="font-display font-black italic text-4xl md:text-5xl uppercase leading-[0.9] text-white mb-4 drop-shadow-xl group-hover:translate-x-2 transition-transform duration-300">
                        {title}
                    </h3>

                    {description && (
                        <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out">
                            <p className="text-gray-300 text-sm font-mono leading-relaxed border-l-2 border-white/20 pl-3 mt-2">
                                {description}
                            </p>
                        </div>
                    )}

                    {/* Tech Decor */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 opacity-60 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                            {tags?.map(tag => (
                                <span key={tag} className="text-[9px] uppercase tracking-wider font-mono text-gray-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <div className={`${colors[accentColor]}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default GridItem;
