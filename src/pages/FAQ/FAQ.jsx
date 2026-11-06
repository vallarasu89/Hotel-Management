import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { faqData } from '../../data/faq';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | MGM Hotels & Resorts</title>
        <meta name="description" content="Find answers regarding check-in times, Wi-Fi, private beach access, cancellation policies, pet friendliness, and destination weddings." />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Hero Header */}
        <div className="bg-[#15191E] text-white py-16 sm:py-20 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-[#C90028]" />
              Guest Knowledge Base
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Everything you need to know about your upcoming stay, reservations, amenities, and policies.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#DCE2E9] overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="font-serif text-lg font-bold text-[#20262D]">
                    {item.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#C90028]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
};

export default FAQ;
