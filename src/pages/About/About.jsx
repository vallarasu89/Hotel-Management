import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, Compass, HeartHandshake, ShieldCheck, Leaf, Sparkles, CheckCircle2 } from 'lucide-react';
import { statisticsData } from '../../data/testimonials';

export const About = () => {
  return (
    <>
      <Helmet>
        <title>About MGM Hotels & Resorts | 35+ Years of Indian Hospitality Legacy</title>
        <meta name="description" content="Discover the heritage of MGM Hotels & Resorts, founded in 1991. Pioneers of coastal luxury and authentic South Indian hospitality." />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Hero Header */}
        <div className="bg-[#15191E] text-white py-16 sm:py-24 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5 text-[#C90028]" />
              Our Legacy Since 1991
            </div>
            <h1 className="font-serif text-3xl sm:text-6xl font-bold tracking-tight text-white mb-6">
              The Soul of Warm Indian Hospitality
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
              For over three decades, MGM Hotels & Resorts has welcomed discerning travelers to experience the serenity of India’s coastal treasures and timeless cultural heritage.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          
          {/* Split Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#C90028] uppercase tracking-widest">
                Our Genesis & Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#20262D] leading-tight">
                Rooted in Traditional South Indian Values, Crafted for Modern Luxury
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                When MGM Beach Resorts opened its gates on Chennai’s East Coast Road in 1991, it redefined coastal tourism in Southern India. Designed with traditional red-tiled Mangalore roofs, open verandas, and sprawling botanical gardens, the resort established a sanctuary where families could reconnect away from urban haste.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Today, our portfolio spans beachfront resorts, wellness sanctuaries, highway transit oases, metropolitan luxury towers, and historic Rajasthani havelis — unified by our unwavering commitment to heartfelt care.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
                  alt="MGM hospitality legacy"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Statistics Strip */}
          <div className="bg-[#20262D] text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {statisticsData.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#C90028]">{stat.value}</div>
                <div className="text-sm font-bold text-white">{stat.label}</div>
                <p className="text-xs text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Sustainability & Eco-Consciousness */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DCE2E9] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                <Leaf className="w-4 h-4" />
                Sustainable Stewardship
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#20262D]">
                Preserving Coastal Ecology for Generations
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We believe genuine luxury must walk hand in hand with environmental responsibility. Our resorts harness solar thermal energy, treat and recycle 100% of greywater for organic garden irrigation, support local artisanal fishermen, and have eliminated single-use guest plastics.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Solar Powered Heating & Lighting</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Plastic Bottling Plant</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Organic Herb & Spice Gardens</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Turtle Nesting Shoreline Protection</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
                alt="Ayurveda and nature"
                className="rounded-2xl w-full h-[320px] object-cover shadow-md"
              />
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default About;

