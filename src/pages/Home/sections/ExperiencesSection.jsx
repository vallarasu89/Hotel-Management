import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Clock, MapPin, ArrowRight } from 'lucide-react';
import { experiencesData } from '../../../data/experiences';

export const ExperiencesSection = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/10 text-[#C90028] text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              Curated Moments
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20262D]">
              Unforgettable MGM Experiences
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
              From candlelit dinners by the crashing waves to ancient Ayurvedic healing rituals, discover the art of refined leisure.
            </p>
          </div>

          <Link
            to="/experiences"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#C90028] hover:text-[#A50020] group self-start"
          >
            <span>View All Experiences</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Experiences Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiencesData.map((exp) => (
            <div
              key={exp.id}
              className="group relative rounded-2xl overflow-hidden shadow-md bg-[#20262D] text-white flex flex-col justify-end min-h-[380px] p-6 hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image */}
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-50"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15191E] via-[#20262D]/60 to-transparent" />

              {/* Content on Image */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-amber-300 font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{exp.duration}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                  {exp.title}
                </h3>

                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {exp.description}
                </p>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-gray-400">
                    <MapPin className="w-3 h-3 text-[#C90028]" />
                    <span className="truncate max-w-[120px]">{exp.location.split(',')[0]}</span>
                  </div>
                  <span className="font-bold text-white text-[11px] bg-[#C90028] px-2.5 py-1 rounded-md">
                    {exp.price.split(' ')[0]} {exp.price.split(' ')[1]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperiencesSection;

