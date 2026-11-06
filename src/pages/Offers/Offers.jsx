import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Tag, Copy, Check, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { offersData } from '../../data/offers';
import { useBooking } from '../../context/BookingContext';
import { CardSkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';

export const Offers = () => {
  const navigate = useNavigate();
  const { applyCouponCode } = useBooking();
  const { loading } = useAsyncData(offersData, 400);

  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCouponCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleBookOffer = (offer) => {
    applyCouponCode(offer.code);
    navigate(`/booking?promo=${offer.code}`);
  };

  return (
    <>
      <Helmet>
        <title>Special Packages & Exclusive Tariffs | MGM Hotels & Resorts</title>
        <meta name="description" content="Discover limited-time holiday offers, spa packages, romantic beach dining deals, and advance booking discounts." />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Hero Header */}
        <div className="bg-[#15191E] text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C90028]" />
              Limited Edition Privileges
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Special Offers & Curated Escapes
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Unlock exclusive benefits including dining credits, couple spa treatments, and guaranteed best tariffs when you book direct.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offersData.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-3xl border border-[#DCE2E9] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-4 left-4 bg-[#C90028] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                        {offer.discount}
                      </span>
                      <span className="absolute top-4 right-4 bg-[#20262D]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {offer.tag}
                      </span>
                    </div>

                    <div className="p-8 space-y-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                        <Calendar className="w-4 h-4 text-[#C90028]" />
                        <span>{offer.validUntil}</span>
                      </div>

                      <h2 className="font-serif text-2xl font-bold text-[#20262D]">
                        {offer.title}
                      </h2>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {offer.description}
                      </p>

                      <div className="text-xs text-gray-400 italic">
                        {offer.terms}
                      </div>

                      {/* Promo Code Box */}
                      <div className="bg-[#F2F5F9] border border-dashed border-[#DCE2E9] rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Coupon Code</span>
                          <span className="font-mono text-base font-bold text-[#20262D]">{offer.code}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(offer.code)}
                          className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                            copiedCode === offer.code
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white hover:bg-gray-100 text-[#20262D] border border-gray-200'
                          }`}
                        >
                          {copiedCode === offer.code ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Code Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-0">
                    <button
                      onClick={() => handleBookOffer(offer)}
                      className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book With {offer.code}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default Offers;

