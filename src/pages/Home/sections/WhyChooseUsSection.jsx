import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Utensils, 
  Sparkles, 
  Gift 
} from 'lucide-react';
import { whyChooseUsData } from '../../../data/testimonials';
import ScrollReveal from '../../../components/animations/ScrollReveal';

const iconMap = {
  ShieldCheck,
  Clock,
  Award,
  Utensils,
  Sparkles,
  Gift
};

export const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-[#F2F5F9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/10 text-[#C90028] text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              The MGM Distinction
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20262D]">
              Why Discerning Guests Choose MGM
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
              Every stay is elevated by our founding promise: generous Indian hospitality, impeccable hygiene, culinary authenticity, and effortless peace of mind.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Feature Cards with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUsData.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Award;

            return (
              <ScrollReveal key={idx} direction="up" distance={30} delay={idx * 0.08}>
                <div
                  className="bg-white rounded-2xl p-8 border border-[#DCE2E9] shadow-sm hover:shadow-xl hover:border-[#C90028]/30 transition-all duration-300 group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#F2F5F9] group-hover:bg-[#C90028] text-[#C90028] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6 shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#20262D] group-hover:text-[#C90028] transition-colors mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#F2F5F9] text-xs font-bold text-gray-400 group-hover:text-[#C90028] flex items-center gap-1 transition-colors">
                    <span>Guaranteed MGM Standard</span>
                    <span>→</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
