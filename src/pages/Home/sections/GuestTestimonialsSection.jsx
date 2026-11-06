import React from 'react';
import { Star, Quote, CheckCircle, Award } from 'lucide-react';
import { testimonialsData } from '../../../data/testimonials';
import { TestimonialSkeleton } from '../../../components/skeletons';

export const GuestTestimonialsSection = ({ loading = false }) => {
  return (
    <section className="py-20 bg-[#F2F5F9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/10 text-[#C90028] text-xs font-bold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-[#C90028]" />
              Guest Impressions
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20262D]">
              Cherished Memories & Words of Praise
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
              Discover what dignitaries, families, and honeymooners cherish about their time at MGM Hotels & Resorts.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-[#DCE2E9] shadow-sm">
            <Award className="w-6 h-6 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-[#20262D]">Tripadvisor 4.8 / 5.0</div>
              <div className="text-[10px] text-gray-500">Based on 6,000+ Verified Reviews</div>
            </div>
          </div>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))
          ) : (
            testimonialsData.slice(0, 3).map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 border border-[#DCE2E9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#C90028]/20 group-hover:text-[#C90028]/40 transition-colors" />
                  </div>

                  {/* Quote Body */}
                  <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed mb-6 font-serif">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-[#F2F5F9] flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#20262D] truncate">
                        {testimonial.name}
                      </span>
                      {testimonial.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-[#C90028] shrink-0" title="Verified Guest" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {testimonial.stayedAt}
                    </div>
                    <div className="text-[11px] text-[#C90028] font-semibold mt-0.5">
                      {testimonial.tripType} • {testimonial.date}
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default GuestTestimonialsSection;

