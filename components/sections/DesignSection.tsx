import React from 'react';
import GridItem from '../GridItem';
import StatsCard from '../StatsCard';

const DesignSection: React.FC = () => {
    return (
        <section id="design" className="relative max-w-[1800px] mx-auto px-6 py-20 bg-[#0a0a0a] border-y border-white/5">
            <div className="mb-12 flex items-end gap-4">
                <h2 className="font-display font-black italic text-5xl md:text-7xl text-white uppercase leading-none">
                    Design & <span className="text-stroke-neon">3D Printing</span>
                </h2>
                <div className="h-4 w-24 bg-timpview-blue mb-3 hidden md:block skew-x-[-20deg]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
                {/* Maker Lab */}
                <GridItem
                    className="md:col-span-6 md:row-span-1 min-h-[350px]"
                    title="Maker Lab"
                    subtitle="Bambu X1C // 02"
                    description="Rapid prototyping and functional part design."
                    imageUrl="/assets/3d-prints/shields.jpg"
                    accentColor="neon"
                    tags={['3DPrint', 'Engineering', 'PLA+']}
                    link="#printing"
                />

                {/* Live Stats */}
                <div className="md:col-span-6 md:row-span-1">
                    <StatsCard />
                </div>

                {/* Custom Mounts */}
                <GridItem
                    className="md:col-span-6 md:row-span-1"
                    title="Custom Mounts"
                    subtitle="Prototyping // 04"
                    description="High-strength mounts for field equipment."
                    imageUrl="/assets/3d-prints/20251113_140433.jpg"
                    accentColor="neon"
                    tags={['Fusion360', 'Design']}
                    link="#"
                />

                {/* Field Gear */}
                <GridItem
                    className="md:col-span-6 md:row-span-1"
                    title="Field Gear"
                    subtitle="Production // 05"
                    description="On-demand manufacturing for team needs."
                    imageUrl="/assets/3d-prints/20251113_202107.jpg"
                    accentColor="orange"
                    tags={['BambuLab', 'Production']}
                    link="#"
                />
            </div>
        </section>
    );
};

export default DesignSection;
