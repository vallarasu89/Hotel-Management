import React from 'react';
import { statisticsData } from '../../../data/testimonials';
import { StatisticsSkeleton } from '../../../components/skeletons';
import AnimatedCounter from '../../../components/animations/AnimatedCounter';

export const StatisticsSection = ({ loading = false }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#20262D] text-white relative overflow-hidden border-y border-white/5">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C90028]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {loading ? (
          <StatisticsSkeleton dark={true} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {statisticsData.map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:border-[#C90028]/50 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#C90028] group-hover:scale-105 transition-transform duration-300 mb-2">
                  <AnimatedCounter value={stat.value} duration={1800} />
                </div>
                <div className="text-base sm:text-lg font-bold text-white mb-1.5 tracking-wide">
                  {stat.label}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default StatisticsSection;
