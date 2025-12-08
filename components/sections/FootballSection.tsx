import React from 'react';
import { motion } from 'framer-motion';
import VideoPlaceholder from '../VideoPlaceholder';
import GridItem from '../GridItem';
import PhilosophyCard from '../PhilosophyCard';

interface Game {
    date: string;
    opponent: string;
    score: string;
    result: 'W' | 'L';
    location: 'vs' | '@';
    type?: string;
    notes?: string;
}

const SEASON_2025: Game[] = [
    { date: 'AUG 15', opponent: 'West', score: '23-50', result: 'L', location: 'vs', type: 'Preseason' },
    { date: 'AUG 22', opponent: 'American Fork', score: '25-48', result: 'L', location: '@', type: 'Preseason', notes: '6A' },
    { date: 'AUG 29', opponent: 'Lone Peak', score: '10-42', result: 'L', location: '@', type: 'Preseason', notes: '6A' },
    { date: 'SEP 05', opponent: 'Payson', score: '59-13', result: 'W', location: 'vs' },
    { date: 'SEP 12', opponent: 'Wasatch', score: '33-14', result: 'W', location: '@' },
    { date: 'SEP 19', opponent: 'Maple Mountain', score: '44-20', result: 'W', location: 'vs' },
    { date: 'SEP 26', opponent: 'Orem', score: '9-22', result: 'L', location: '@' },
    { date: 'OCT 03', opponent: 'Springville', score: '0-28', result: 'L', location: 'vs' },
    { date: 'OCT 09', opponent: 'Pleasant Grove', score: '19-7', result: 'W', location: '@' },
    { date: 'OCT 15', opponent: 'Spanish Fork', score: '34-7', result: 'W', location: 'vs' },
    { date: 'OCT 24', opponent: 'Wasatch', score: '40-15', result: 'W', location: '@', type: 'Playoffs' },
    { date: 'OCT 31', opponent: 'Orem', score: '22-40', result: 'L', location: 'vs', type: 'Playoffs' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
};

const lacesContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const laceVariants = {
    hidden: { x: -15, opacity: 0, rotate: -45 },
    show: {
        x: 0,
        opacity: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 }
    }
} as const;

const SeasonSchedule: React.FC = () => {
    return (
        <div className="bg-black/90 border border-white/10 p-6 md:p-8 h-full flex flex-col relative overflow-hidden group">
            {/* Ambient Backlight */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-timpview-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex justify-between items-end mb-8 relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-timpview-orange rounded-full animate-pulse"></div>
                        <span className="font-mono text-xs text-timpview-orange uppercase tracking-[0.2em]">Season 2025</span>
                    </div>
                    <h3 className="font-display font-black italic text-4xl text-white uppercase leading-none">
                        Season <span className="text-stroke">Schedule</span>
                    </h3>
                </div>
                <div className="text-right hidden md:block">
                    <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">Overall Record</div>
                    <div className="font-display font-bold text-3xl text-white">6-6</div>
                </div>
            </div>

            {/* Column Headers */}
            <div className="flex px-2 md:px-4 pb-4 border-b border-white/10 text-[9px] md:text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest relative z-10 opacity-60">
                <div className="w-[15%]">Date</div>
                <div className="w-[30%] text-right pr-2">Home</div>
                <div className="w-[10%] text-center text-timpview-orange">Div</div>
                <div className="w-[30%] pl-2">Away</div>
                <div className="w-[15%] text-right">Res</div>
            </div>

            <motion.div
                className="flex-1 flex flex-col relative z-10 overflow-y-auto custom-scrollbar"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
            >
                {SEASON_2025.map((game, idx) => {
                    const isHomeGame = game.location === 'vs';
                    const homeTeam = isHomeGame ? 'TIMPVIEW' : game.opponent;
                    const awayTeam = isHomeGame ? game.opponent : 'TIMPVIEW';

                    // Determine row background based on result
                    const resultBg = game.result === 'W'
                        ? 'bg-gradient-to-r from-emerald-600/40 to-transparent border-emerald-500/30'
                        : game.result === 'L'
                            ? 'bg-gradient-to-r from-rose-600/40 to-transparent border-rose-500/30'
                            : 'border-transparent';

                    return (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className={`group/row relative flex items-center py-3 md:py-4 px-2 md:px-4 border-l-4 border-b border-white/5 hover:bg-white/5 transition-all cursor-default overflow-hidden ${resultBg}`}
                            whileHover="show"
                        >
                            {/* Laces Effect */}
                            <motion.div
                                className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-20 pointer-events-none"
                                variants={lacesContainerVariants}
                            >
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        variants={laceVariants}
                                        className="w-3 h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    />
                                ))}
                            </motion.div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-timpview-orange/20 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            {/* Date Block */}
                            <div className="w-[15%] flex flex-col relative z-10">
                                <span className="font-display font-bold text-[9px] md:text-[10px] text-gray-500 group-hover/row:text-timpview-orange transition-colors uppercase leading-none">{game.date.split(' ')[0]}</span>
                                <span className="font-display font-black text-sm md:text-xl text-white leading-none mt-0.5">{game.date.split(' ')[1]}</span>
                            </div>

                            {/* Home Team */}
                            <div className={`w-[30%] text-right pr-2 font-display font-black text-[10px] md:text-sm lg:text-base uppercase leading-tight relative z-10 break-words ${homeTeam === 'TIMPVIEW' ? 'text-white' : 'text-gray-400 group-hover/row:text-gray-200 transition-colors'}`}>
                                {homeTeam}
                                {homeTeam !== 'TIMPVIEW' && game.type && <span className="block text-[8px] font-mono text-timpview-orange tracking-wider mt-0.5 md:mt-1">{game.type}</span>}
                            </div>

                            {/* Score / VS - Center Axis */}
                            <div className="w-[10%] flex flex-col justify-center items-center relative z-10 shrink-0">
                                <span className="font-mono text-xs md:text-base font-bold text-white tracking-widest leading-none whitespace-nowrap">{game.score}</span>
                                <span className="text-[8px] font-mono font-bold text-gray-500 mt-0.5 md:mt-1 uppercase opacity-50">
                                    VS
                                </span>
                            </div>

                            {/* Away Team */}
                            <div className={`w-[30%] pl-2 font-display font-black text-[10px] md:text-sm lg:text-base uppercase leading-tight relative z-10 break-words ${awayTeam === 'TIMPVIEW' ? 'text-white' : 'text-gray-400 group-hover/row:text-gray-200 transition-colors'}`}>
                                {awayTeam}
                                {awayTeam !== 'TIMPVIEW' && game.type && <span className="block text-[8px] font-mono text-timpview-orange tracking-wider mt-0.5 md:mt-1">{game.type}</span>}
                            </div>

                            {/* Result */}
                            <div className="w-[15%] flex justify-end relative z-10">
                                <div className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-display font-black text-xs md:text-sm italic transform skew-x-[-10deg] ${game.result === 'W' ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-rose-500/10 border border-rose-500/50 text-rose-500'}`}>
                                    {game.result}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* BG pattern */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-[0.03] pointer-events-none"></div>
        </div>
    );
};

const FootballSection: React.FC = () => {
    return (
        <section id="football" className="relative max-w-[1800px] mx-auto px-6 py-20 border-t border-white/5">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="relative">
                    <h2 className="font-display font-black italic text-6xl md:text-8xl text-white uppercase leading-none relative z-10">
                        TIMPVIEW <span className="text-transparent text-stroke-neon block md:inline">FOOTBALL</span>
                    </h2>
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-timpview-orange/20 rounded-full blur-[60px]"></div>
                </div>
                <p className="font-mono text-sm text-gray-400 max-w-sm text-right">
                    Establish the standard. Defend the legacy. <br />
                    <span className="text-timpview-orange">#ThunderbirdNation</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Featured Video - Top Highlight */}
                <div className="md:col-span-7 flex flex-col gap-8">
                    <div className="aspect-video w-full relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-timpview-orange to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative h-full w-full bg-black border border-white/10">
                            <VideoPlaceholder className="w-full h-full" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Timpview Card */}
                        <GridItem
                            className="h-full min-h-[300px]"
                            title="Defensive Line"
                            subtitle="Unit // 01"
                            description="Forging elite defensive lines through technique, discipline, and aggressive strategy."
                            imageUrl="/assets/football/20250728_202959.jpg"
                            accentColor="orange"
                            tags={['Coach', 'Defense']}
                            link="https://timpview.provo.edu/"
                        />
                        {/* Philosophy Card - now standard sized */}
                        <div className="h-full min-h-[300px]">
                            <PhilosophyCard />
                        </div>
                    </div>
                </div>

                {/* Season Schedule - Full Height Column */}
                <div className="md:col-span-5">
                    <SeasonSchedule />
                </div>

            </div>
        </section>
    );
};

export default FootballSection;
