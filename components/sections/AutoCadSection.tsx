import React from 'react';
import GridItem from '../GridItem';

const AutoCadSection: React.FC = () => {
    return (
        <section id="autocad" className="relative max-w-[1800px] mx-auto px-6 py-20">
            <div className="mb-12 flex items-end gap-4">
                <h2 className="font-display font-black italic text-5xl md:text-7xl text-white uppercase leading-none">
                    AutoCAD <span className="text-gray-500">Services</span>
                </h2>
                <div className="h-4 w-24 bg-white mb-3 hidden md:block skew-x-[-20deg]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
                {/* Engineering Service */}
                <GridItem
                    className="md:col-span-8 md:row-span-1 min-h-[350px]"
                    title="Engineering Design"
                    subtitle="AutoCAD // Services"
                    description="Professional CAD drafting and engineering design services for architectural and mechanical projects."
                    imageUrl="/assets/3d-prints/20241206_202100.jpg" // Using existing image as placeholder
                    accentColor="blue"
                    tags={['AutoCAD', 'Drafting', 'R&D']}
                    link="#"
                />

                {/* LinkedIn / Contact */}
                <GridItem
                    className="md:col-span-4 md:row-span-1 bg-[#0077b5]"
                    title="Hire Me"
                    subtitle="Contact // 03"
                    description="Connect on LinkedIn for project inquiries."
                    imageUrl="https://picsum.photos/600/600?random=30" // Placeholder
                    accentColor="white"
                    tags={['LinkedIn', 'Resume']}
                    link="https://www.linkedin.com/in/devin-mausia-7b42a0156/"
                />
            </div>
        </section>
    );
};

export default AutoCadSection;
