import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tag, Copy, Check, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { offersData } from '../../../data/offers';
import { useBooking } from '../../../context/BookingContext';
import { useToast } from '../../../context/ToastContext';

export const SpecialOffersSection = () => {
  const navigate = useNavigate();
  const { applyCouponCode } = useBooking();
  const toast = useToast();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCouponCode(code);
    toast.success(`Coupon code ${code} copied and applied to your booking!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleBookWithOffer = (offer) => {
    applyCouponCode(offer.code);
    toast.info(`Offer "${offer.title}" applied!`);
    navigate(`/booking?promo=${offer.code}`);
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/10 text-[#C90028] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Limited-Time Packages
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20262D]">
              Special Offers & Exclusive Getaways
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
              Enjoy bespoke privileges, curated dining credits, and guaranteed savings when booking directly.
            </p>
          </div>

          <Link
            to="/offers"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#C90028] hover:text-[#A50020] group self-start"
          >
            <span>All Seasonal Packages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offersData.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#DCE2E9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Offer Image with Tag */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#C90028] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {offer.discount}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#20262D]/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {offer.tag}
                    </span>
                  </div>
                </div>

                {/* Offer Body */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C90028]" />
                    <span>{offer.validUntil}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#20262D] group-hover:text-[#C90028] transition-colors mb-2.5">
                    {offer.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  {/* Promo Code Box */}
                  <div className="bg-[#F2F5F9] border border-dashed border-[#DCE2E9] rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">Coupon Code</span>
                      <span className="font-mono text-sm font-bold text-[#20262D] tracking-wider">{offer.code}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer.code)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                        copiedCode === offer.code
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-gray-100 text-[#20262D] border border-gray-200'
                      }`}
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Book Offer Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleBookWithOffer(offer)}
                  className="w-full bg-[#C90028] hover:bg-[#A50020] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md active:scale-95 cursor-pointer"
                >
                  Book With This Offer
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SpecialOffersSection;
