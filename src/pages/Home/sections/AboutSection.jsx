import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, HeartHandshake, Utensils, CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollReveal from '../../../components/animations/ScrollReveal';

export const AboutSection = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#F2F5F9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Mosaic */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="left" distance={40}>
              {/* Primary Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
                  alt="MGM Beach Resorts hospitality"
                  className="w-full h-[450px] sm:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                    Est. 1991 • Chennai Coast
                  </span>
                  <p className="font-serif text-xl sm:text-2xl font-semibold mt-1">
                    "Atithi Devo Bhava — The Guest is Truly Divine"
                  </p>
                </div>
              </div>

              {/* Overlapping Floating Accent Card */}
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-64 bg-[#20262D] text-white p-5 rounded-2xl shadow-2xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#C90028] flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold font-serif text-white">35+ Years</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider">Unbroken Legacy</div>
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-snug">
                  Pioneering coastal luxury & authentic South Indian hospitality across India.
                </p>
              </div>

              {/* Decorative Red Accent Block */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#C90028]/10 rounded-2xl -z-10" />
            </ScrollReveal>
          </div>

          {/* Right Column: Editorial Narrative & Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right" distance={40} delay={0.15}>
              
              {/* Section Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/10 text-[#C90028] text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                About Our Hospitality
              </div>

              {/* Large Bold Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20262D] leading-[1.15] mt-3 mb-4">
                Where Coastal Serenity Meets the Warmth of Indian Soul
              </h2>

              {/* Paragraph Narrative */}
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Founded over three decades ago along the sun-drenched shores of Chennai's East Coast Road, MGM Hotels & Resorts was created with a singular devotion: to immerse travelers in genuine, unpretentious Indian warmth complemented by world-class modern luxuries.
              </p>

              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Whether you are strolling down our private sandy beach under swaying coconut palms, savoring coastal seafood slow-simmered in clay pots, or relaxing in our heritage havelis, every encounter is marked by generous grace and thoughtful intuition.
              </p>

              {/* 3 Signature Pillars */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C90028]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <HeartHandshake className="w-5 h-5 text-[#C90028]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#20262D]">Heartfelt Personal Butler & Concierge Service</h3>
                    <p className="text-sm text-gray-500">Every need anticipated with gentle care, from customized sunrise yoga to bespoke family dining setups.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C90028]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Utensils className="w-5 h-5 text-[#C90028]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#20262D]">Locally Rooted Gourmet Traditions</h3>
                    <p className="text-sm text-gray-500">Fresh morning catches from local fishermen, organic garden spices, and artisanal Chettinad recipes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C90028]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-[#C90028]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#20262D]">Sustainable & Eco-Conscious Sanctuaries</h3>
                    <p className="text-sm text-gray-500">Solar-powered cottages, rainwater harvesting, zero-plastic initiatives, and preservation of local flora.</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6 flex items-center gap-4">
                <Link
                  to="/about"
                  className="bg-[#20262D] hover:bg-[#15191E] text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 text-[#C90028]" />
                </Link>

                <Link
                  to="/hotels"
                  className="text-[#C90028] hover:text-[#A50020] font-bold text-sm tracking-wide uppercase flex items-center gap-1 group"
                >
                  <span>View Our Resorts</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
