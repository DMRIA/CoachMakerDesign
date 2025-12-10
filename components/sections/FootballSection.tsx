import React from 'react';
import { motion } from 'framer-motion';
import GridItem from '../GridItem';
import PhilosophyCard from '../PhilosophyCard';
import { SEASON_2025, Game } from '../../data/schedule';

const TIMPVIEW_NAME = 'TIMPVIEW';
const TIMPVIEW_LOGO = '/school-logos/timpview.png';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: {
        y: 20,
        opacity: 0,
        scale: 0.98,
        rotateX: -10
    },
    show: {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.9
        }
    },
    hover: {
        scale: 1.02,
        zIndex: 10,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const ScheduleCard: React.FC<{ game: Game; idx: number }> = ({ game, idx }) => {

    // Parse Scores & Logic
    const [timpviewScoreStr, opponentScoreStr] = game.score.split('-').map(s => s.trim());
    const timpviewScore = Number.parseInt(timpviewScoreStr, 10);
    const opponentScore = Number.parseInt(opponentScoreStr, 10);
    const timpviewWon = timpviewScore > opponentScore;
    const isHomeGame = game.location === 'vs';

    const awayTeam = {
        name: isHomeGame ? game.opponent : TIMPVIEW_NAME,
        logo: isHomeGame ? game.logo : TIMPVIEW_LOGO,
        score: isHomeGame ? opponentScoreStr : timpviewScoreStr
    };

    const homeTeam = {
        name: isHomeGame ? TIMPVIEW_NAME : game.opponent,
        logo: isHomeGame ? TIMPVIEW_LOGO : game.logo,
        score: isHomeGame ? timpviewScoreStr : opponentScoreStr
    };

    // "Reference Style" Colors
    const statusColor = timpviewWon ? 'text-emerald-500' : 'text-rose-500';
    const borderColor = timpviewWon ? 'border-emerald-500' : 'border-rose-500';

    // Dynamic Glow on Hover
    const hoverGlow = timpviewWon
        ? "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:border-emerald-500/50"
        : "group-hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] group-hover:border-rose-500/50";

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            whileHover="hover"
            whileTap="tap"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative z-0 cursor-pointer mb-3 perspective-1000"
        >
            {/* Main Card Container with Gradient Border Simulation */}
            <motion.div
                className={`relative rounded-xl p-[2px] bg-gradient-to-r from-sky-500 via-white/20 to-timpview-orange overflow-hidden transition-all duration-300 ${hoverGlow}`}
            >
                <div className="bg-black/90 rounded-[10px] h-full relative overflow-hidden">

                    {/* Background Detail */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                    {game.momentImage && (
                        <motion.div
                            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                        >
                            <img src={game.momentImage} className="w-full h-full object-cover grayscale mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
                        </motion.div>
                    )}

                    {/* Content Row */}
                    <div className="relative z-10 flex items-center justify-between px-3 md:px-5 py-3 md:py-4 gap-4 h-full">

                        {/* 1. DATE */}
                        <div className="w-16 md:w-20 shrink-0 flex flex-col items-center justify-center leading-none">
                            <span className="font-display font-black italic text-lg md:text-2xl text-timpview-orange uppercase tracking-tighter">
                                {game.date.split(' ')[0]}
                            </span>
                            <span className="font-display font-black italic text-lg md:text-2xl text-timpview-orange uppercase tracking-tighter">
                                {game.date.split(' ')[1]}
                            </span>
                        </div>

                        {/* Separator */}
                        <div className="w-[1px] h-8 md:h-10 bg-white/20"></div>

                        {/* 2. MATCHUP (centered inline) */}
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center gap-4 flex-wrap justify-center">
                                {/* Away */}
                                <div className="flex items-center gap-2 min-w-[140px] md:min-w-[160px]">
                                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border border-white/15 bg-white/5 flex items-center justify-center overflow-hidden">
                                        {awayTeam.logo ? (
                                            <img
                                                src={awayTeam.logo}
                                                alt={`${awayTeam.name} logo`}
                                                className="w-full h-full object-contain"
                                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                            />
                                        ) : (
                                            <span className="font-display font-black text-white text-sm">{awayTeam.name.slice(0, 2)}</span>
                                        )}
                                    </div>
                                    <span className="font-display font-black italic text-base md:text-xl text-white uppercase tracking-tight whitespace-normal">{awayTeam.name}</span>
                                </div>

                                {/* Score */}
                                <div className="flex items-center gap-2 font-mono font-bold text-lg md:text-2xl text-white tabular-nums tracking-widest">
                                    <span>{awayTeam.score}</span>
                                    <span className="text-gray-400 text-sm md:text-base">@</span>
                                    <span>{homeTeam.score}</span>
                                </div>

                                {/* Home */}
                                <div className="flex items-center gap-2 min-w-[140px] md:min-w-[160px]">
                                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border border-white/15 bg-white/5 flex items-center justify-center overflow-hidden">
                                        {homeTeam.logo ? (
                                            <img
                                                src={homeTeam.logo}
                                                alt={`${homeTeam.name} logo`}
                                                className="w-full h-full object-contain"
                                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                            />
                                        ) : (
                                            <span className="font-display font-black text-white text-sm">{homeTeam.name.slice(0, 2)}</span>
                                        )}
                                    </div>
                                    <span className="font-display font-black italic text-base md:text-xl text-white uppercase tracking-tight whitespace-normal">{homeTeam.name}</span>
                                </div>
                            </div>
                        </div>

                        {/* 3. RESULT INDICATORS */}
                        <div className="flex items-center gap-3 md:gap-5 shrink-0">

                            {/* W/L Circle */}
                            <motion.div
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${borderColor} ${statusColor} bg-black/50 flex items-center justify-center font-display font-black italic text-sm md:text-lg shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]`}
                                variants={{ hover: { scale: 1.1 } }}
                            >
                                {timpviewWon ? 'W' : 'L'}
                            </motion.div>

                            {/* Arrow */}
                            <motion.div
                                className={`${statusColor} drop-shadow-[0_0_5px_currentColor]`}
                                variants={{
                                    hover: {
                                        y: timpviewWon ? -3 : 3,
                                        scale: 1.1,
                                        transition: { repeat: Infinity, repeatType: "reverse", duration: 0.6 }
                                    }
                                }}
                            >
                                {timpviewWon ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <path d="M12 4l-8 8h6v8h4v-8h6z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <path d="M12 20l8-8h-6v-8h-4v8h-6z" />
                                    </svg>
                                )}
                            </motion.div>

                        </div>

                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const SeasonSchedule: React.FC = () => {
    const wins = SEASON_2025.filter(g => g.result === 'W').length;
    const losses = SEASON_2025.filter(g => g.result === 'L').length;

    return (
        <div className="bg-black/95 border border-white/10 h-full flex flex-col relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

            <div className="p-4 md:p-6 border-b border-white/10 relative z-10 bg-gradient-to-b from-blue-900/10 to-transparent flex flex-col gap-6">
                <div className="flex justify-between items-end">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></div>
                            <span className="font-mono text-[9px] text-sky-500 uppercase tracking-widest font-bold">Official Record</span>
                        </div>
                        <div>
                            <h3 className="font-display font-black italic text-3xl md:text-4xl text-white uppercase leading-none">
                                2025 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-500">Season</span>
                            </h3>
                            <div className="font-mono text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">
                                Record: {wins}-{losses}
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 font-mono text-[9px] text-gray-300 tracking-widest uppercase items-center">
                        <div className="flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 border border-emerald-300/50"></span>Win
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-rose-500 border border-rose-300/50"></span>Loss
                        </div>
                    </div>
                </div>

                {/* Column Headers - Mimicking Card Layout */}
                <div className="hidden md:flex items-center gap-4 px-2 opacity-80">
                    <div className="w-20"></div> {/* Date Placeholder */}
                    <div className="flex-1 flex justify-center items-center gap-4">
                        <div className="min-w-[160px] flex justify-center">
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-widest text-sky-300">Away Team</span>
                        </div>
                        <div className="w-24"></div> {/* Score Placeholder */}
                        <div className="min-w-[160px] flex justify-center">
                            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-widest text-orange-300">Home Team</span>
                        </div>
                    </div>
                    <div className="w-32"></div> {/* Result Placeholder */}
                </div>
            </div>

            <motion.div
                className="flex-1 overflow-y-auto custom-scrollbar relative z-10 px-2 md:px-4 py-4 space-y-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
            >
                {SEASON_2025.map((game, idx) => (
                    <ScheduleCard key={idx} game={game} idx={idx} />
                ))}
            </motion.div>
        </div>
    );
};

const FootballSection: React.FC = () => {
    return (
        <section id="football" className="relative max-w-[1800px] mx-auto px-4 md:px-6 py-20 border-t border-white/5 bg-black">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="font-mono text-xs text-sky-500 mb-2 block tracking-widest">TIMPVIEW FOOTBALL</span>
                    <h2 className="font-display font-black italic text-5xl md:text-8xl text-white uppercase leading-none">
                        Legacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-white to-timpview-orange">Defense</span>
                    </h2>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {/* Season Schedule */}
                <div className="min-h-[520px]">
                    <SeasonSchedule />
                </div>

                {/* Defensive Line Card */}
                <div className="min-h-[300px]">
                    <GridItem
                        className="h-full"
                        title="Defensive Line"
                        subtitle="Unit // 01"
                        description="Forging elite defensive lines through technique, discipline, and aggressive strategy."
                        imageUrl="/assets/field-view.png"
                        accentColor="blue"
                        tags={['Coach', 'Defense']}
                        link="/football"
                    />
                </div>

                {/* Philosophy Card */}
                <div className="min-h-[260px]">
                    <PhilosophyCard />
                </div>
            </div>
        </section>
    );
};

export default FootballSection;
