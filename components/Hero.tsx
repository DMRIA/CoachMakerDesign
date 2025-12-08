import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-lando-dark">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 bg-fixed z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lando-dark/50 to-timpview-blue/90 z-20"></div>

        {/* Main Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 scale-105"
        >
          <source src="/assets/football/hero.m4v" type="video/mp4" />
          {/* Fallback Image */}
          <img
            src="/assets/football/20250728_202959.jpg"
            alt="Background Texture"
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Floating Elements/Grid Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5"></div>
        <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5"></div>
        <div className="absolute bottom-32 left-0 w-full h-[1px] bg-white/5"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-[1800px] px-8 md:px-16 flex flex-col md:flex-row items-center md:items-end justify-between h-full pt-20 pb-32">

        {/* Text Block */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-6 border-l-4 border-timpview-blue pl-4">
            <span className="font-mono text-xs text-timpview-blue tracking-[0.2em] uppercase bg-timpview-blue/10 px-2 py-1">
              Status: Online
            </span>
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
              Provo, UT
            </span>
          </div>

          <h1 className="relative font-display font-black italic text-5xl md:text-8xl lg:text-[8rem] leading-[0.85] tracking-tighter uppercase text-white mix-blend-lighten">
            <span className="block hover:text-timpview-orange transition-colors duration-500">Defensive</span>
            <span className="block text-stroke text-transparent hover:text-white transition-all duration-500">Line</span>
            <span className="block text-timpview-blue md:ml-24">Architect</span>
          </h1>
        </div>

        {/* Stat/Intro Block */}
        <div className="md:w-[400px] mt-12 md:mt-0 text-left relative">
          {/* Decorative Backdrop */}
          <div className="absolute -inset-4 bg-white/5 skew-x-[-12deg] -z-10 border border-white/10 backdrop-blur-sm"></div>

          <p className="font-mono text-sm text-gray-400 leading-relaxed mb-6 border-b border-white/10 pb-6">
            Combining the tactical discipline of <strong className="text-white">Gridiron Football</strong> with the precision engineering of <strong className="text-white">3D Printing</strong>. Building walls and printing solutions.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-1">Team</div>
              <div className="font-display font-bold italic text-xl">TIMPVIEW HS</div>
            </div>
            <div>
              <div className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-1">Equipment</div>
              <div className="font-display font-bold italic text-xl text-lando-neon">BAMBU X1C</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 animate-pulse">Scroll_Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-lando-neon to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;