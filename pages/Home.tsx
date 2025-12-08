import React from 'react';
import Navbar from '../components/Navbar';
import IntroSection from '../components/sections/IntroSection';
import FootballSection from '../components/sections/FootballSection';
import DesignSection from '../components/sections/DesignSection';
import AutoCadSection from '../components/sections/AutoCadSection';
import ChatAssistant from '../components/ChatAssistant';
import { TextReveal } from '../components/TextReveal';
import { ScrollText } from '../components/ScrollText';
import { HoverScramble } from '../components/HoverScramble';

// Reusing the footer from App.tsx - ideally should be its own component
const Footer: React.FC = () => (
    <footer className="bg-black py-20 border-t border-white/10 relative overflow-hidden">
        {/* Giant Watermark */}
        <div className="absolute -bottom-20 -right-20 text-[15rem] font-display font-black italic text-white/5 pointer-events-none select-none">
            <ScrollText speed={0.2} direction="up">
                LN4
            </ScrollText>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-4 h-12 bg-timpview-orange skew-x-[-12deg]"></div>
                    <h2 className="text-4xl font-display font-black italic uppercase text-white leading-none">
                        <TextReveal text="COACH PROFILE" type="word" delay={0.2} />
                    </h2>
                </div>
                <p className="font-mono text-gray-500 max-w-sm">
                    Dedicated to the pursuit of perfection on the field and in the lab.
                </p>
            </div>

            <div className="flex flex-col md:items-end justify-between">
                <div className="flex gap-8 font-mono text-sm font-bold text-gray-400 uppercase tracking-widest">
                    <a href="/" className="hover:text-timpview-orange transition-colors">
                        <HoverScramble text="Home" />
                    </a>
                    <a href="#football" className="hover:text-timpview-orange transition-colors">
                        <HoverScramble text="Coaching" />
                    </a>
                    <a href="#design" className="hover:text-timpview-orange transition-colors">
                        <HoverScramble text="Printing" />
                    </a>
                </div>
                <div className="mt-8 md:mt-0 text-right">
                    <p className="text-gray-600 text-[10px] font-mono mb-2">© {new Date().getFullYear()} COACH & MAKER.</p>
                    <p className="text-gray-700 text-[10px] font-mono">DESIGN SYSTEM: LANDO_V1</p>
                </div>
            </div>
        </div>
    </footer>
);

export const Marquee: React.FC<{ text: string, reverse?: boolean }> = ({ text, reverse }) => {
    return (
        <div className="relative flex overflow-hidden py-6 bg-timpview-orange border-y-4 border-black">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
            <div className={`animate-${reverse ? 'marquee-reverse' : 'marquee'} whitespace-nowrap flex gap-8 z-10`}>
                {Array(10).fill(text).map((t, i) => (
                    <span key={i} className="text-5xl font-display font-black italic uppercase tracking-tighter text-black">
                        {t} <span className="text-transparent text-stroke-neon opacity-50 mx-4">///</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    return (
        <div className="bg-lando-dark min-h-screen text-white selection:bg-timpview-orange selection:text-black overflow-x-hidden">
            <div className="noise-overlay"></div>
            <Navbar />

            <main>
                <IntroSection />

                <Marquee text="TIMPVIEW DEFENSE /// We all we need - We all we got! /// DOMINATE THE TRENCHES" />

                <div className="space-y-0">
                    <FootballSection />
                    <DesignSection />
                    <AutoCadSection />
                </div>

                {/* Impact Statement - Keeping it as a global closer */}
                <section className="py-40 text-center px-6 bg-lando-dark relative overflow-hidden border-t border-white/5">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
                        <ScrollText speed={0.3} direction="left" className="w-full">
                            <span className="text-[20vw] font-display font-black italic text-transparent text-stroke opacity-5 whitespace-nowrap">
                                UNSTOPPABLE
                            </span>
                        </ScrollText>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-6xl md:text-9xl font-display font-black uppercase italic tracking-tighter text-white mix-blend-overlay">
                            <TextReveal text="Build. Break." type="word" />
                            <span className="text-timpview-orange block">
                                <TextReveal text="Repeat." type="word" delay={0.5} />
                            </span>
                        </h2>
                    </div>
                </section>
            </main>

            <Footer />
            <ChatAssistant />
        </div>
    );
};

export default Home;
