import React from 'react';
import { Award, Trophy, Star, ShieldCheck } from 'lucide-react';
import { awardsData } from '../../../data/awards';

export const AwardsSection = () => {
  return (
    <section className="py-20 bg-[#20262D] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/20 text-[#C90028] text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            Global Accolades
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Honored by Industry & Valued by Guests
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
            Our steadfast devotion to heartfelt service, authentic coastal dining, and heritage preservation has garnered prestigious domestic and international acclaim.
          </p>
        </div>

        {/* 4 Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {awardsData.map((award, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#C90028] hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C90028]/20 text-[#C90028] group-hover:bg-[#C90028] group-hover:text-white flex items-center justify-center transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-amber-300">
                    {award.year}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-200 transition-colors mb-2">
                  {award.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {award.category}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400">
                Presented by: <span className="text-gray-200 font-semibold">{award.presenter}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AwardsSection;
