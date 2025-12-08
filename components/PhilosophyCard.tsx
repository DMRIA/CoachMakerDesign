import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const PhilosophyCard: React.FC = () => {
    const { elementRef, isVisible } = useScrollAnimation();
    return (
        <div
            ref={elementRef as React.RefObject<HTMLDivElement>}
            className={`bg-lando-card border border-white/10 p-10 flex flex-col justify-center group hover:bg-white/5 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8% 100%, 0 85%)' }}
        >
            <div className="font-mono text-xs text-lando-neon mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-lando-neon rounded-full animate-pulse"></span>
                PHILOSOPHY_OS
            </div>
            <p className="font-display font-black italic text-3xl md:text-4xl text-white uppercase leading-tight">
                "Control the <span className="text-transparent text-stroke">Trenches</span>, Control the <span className="text-lando-neon">Game</span>."
            </p>
        </div>
    );
};

export default PhilosophyCard;
