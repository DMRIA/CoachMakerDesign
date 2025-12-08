import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const StatsCard: React.FC = () => {
    const { elementRef, isVisible } = useScrollAnimation();
    return (
        <div
            ref={elementRef as React.RefObject<HTMLDivElement>}
            className={`bg-black border border-white/10 p-8 relative overflow-hidden group transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-lando-neon/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-lando-neon/10 transition-colors"></div>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">Current Print Job</div>
                    <div className="font-display font-bold italic text-2xl text-white mt-1">HELMET MOUNT V4</div>
                </div>
                <div className="font-mono text-4xl font-bold text-white/20">92%</div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between text-xs font-mono text-gray-400">
                    <span>Nozzle Temp</span>
                    <span className="text-lando-neon">220°C</span>
                </div>
                <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-lando-neon to-white h-full w-[92%] animate-pulse-fast"></div>
                </div>
                <div className="flex justify-between text-xs font-mono text-gray-400">
                    <span>Time Remaining</span>
                    <span>14m 32s</span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
