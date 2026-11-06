import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Compass, Clock, MapPin, Sparkles, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { experiencesData } from '../../data/experiences';

export const Experiences = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setSelectedExperience(null);
    }, 2500);
  };

  return (
    <>
      <Helmet>
        <title>Curated Experiences & Dining | MGM Hotels & Resorts</title>
        <meta name="description" content="Immerse in private beach candlelight dinners, Ayurvedic wellness rituals, coastal cooking masterclasses, and UNESCO heritage trails." />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Hero Header */}
        <div className="bg-[#15191E] text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5 text-[#C90028]" />
              Bespoke Moments
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Curated Hospitality Experiences
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Beyond luxurious stays, we curate intimate memories: from private dining by the gentle surf to age-old Ayurvedic healing journeys.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiencesData.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-3xl border border-[#DCE2E9] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#20262D]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                      {exp.location}
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#C90028]" />
                        <span>{exp.duration}</span>
                      </div>
                      <span className="font-bold text-[#C90028] bg-red-50 px-2.5 py-1 rounded-lg">
                        {exp.price}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-[#20262D] group-hover:text-[#C90028] transition-colors">
                      {exp.title}
                    </h2>

                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {exp.subtitle}
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <button
                    onClick={() => setSelectedExperience(exp)}
                    className="w-full bg-[#20262D] hover:bg-[#15191E] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve This Experience</span>
                    <ArrowRight className="w-4 h-4 text-[#C90028]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Reservation Modal */}
        {selectedExperience && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-200 relative">
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {inquirySent ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-[#20262D]">Experience Request Received!</h3>
                  <p className="text-xs text-gray-500">
                    Our lead concierge will contact you within 2 hours to confirm your custom timing and arrangements.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#C90028] uppercase tracking-wider">Experience Reservation</span>
                    <h3 className="font-serif text-xl font-bold text-[#20262D] mt-0.5">{selectedExperience.title}</h3>
                    <p className="text-xs text-gray-500">{selectedExperience.price} • {selectedExperience.location}</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      defaultValue="Vallarasu Kumar"
                      className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C90028]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        defaultValue="2026-04-12"
                        className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#C90028]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Guests Count *</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        defaultValue="2"
                        className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#C90028]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      defaultValue="+91 98765 43210"
                      className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C90028]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer"
                  >
                    Confirm Experience Request
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Experiences;

