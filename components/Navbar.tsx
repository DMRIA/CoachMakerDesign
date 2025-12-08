import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled
                ? 'py-2 bg-lando-dark/80 backdrop-blur-md border-b border-white/5'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-[1800px] mx-auto px-6 flex justify-between items-center">
                {/* Logo Area */}
                <div
                    className="flex items-center gap-2 group cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <div className="w-2 h-8 bg-timpview-orange skew-x-[-12deg] transition-transform duration-300 group-hover:skew-x-0"></div>
                    <div className="flex flex-col leading-none">
                        <span className="font-display font-black italic text-2xl tracking-tighter text-white">COACH</span>
                        <span className="font-mono text-[10px] text-gray-400 tracking-[0.3em] uppercase">Profile_V2.0</span>
                    </div>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-12">
                    {['Coaching', '3D Printing', 'Contact'].map((item, index) => {
                        const isCoaching = item === 'Coaching';
                        const is3D = item === '3D Printing';
                        const href = isCoaching ? '/football' : is3D ? '/3d-printing' : `#${item.toLowerCase().replace(' ', '-')}`;

                        return (
                            <a
                                key={item}
                                href={href}
                                className="relative group font-mono text-xs font-bold tracking-widest text-gray-400 hover:text-white transition-colors uppercase"
                            >
                                <span className="mr-2 text-timpview-orange opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">0{index + 1} //</span>
                                {item}
                                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-timpview-orange transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        );
                    })}
                </div>

                {/* Action Button */}
                <a
                    href="https://www.linkedin.com/in/devin-mausia-7b42a0156/"
                    target="_blank"
                    rel="noreferrer"
                    className="relative overflow-hidden group bg-white text-black px-6 py-2 font-display font-black italic tracking-wider uppercase text-sm skew-x-[-12deg] hover:bg-timpview-orange transition-colors duration-300"
                >
                    <div className="skew-x-[12deg] relative z-10">Connect &rarr;</div>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;