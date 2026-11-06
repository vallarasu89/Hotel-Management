import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, ShieldCheck, Sparkles } from 'lucide-react';

export const FinalCTASection = () => {
  return (
    <section className="py-20 relative bg-[#15191E] text-white overflow-hidden">
      {/* Background with luxury coastal resort image & dark gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80"
          alt="MGM coastal luxury pool"
          className="w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15191E] via-[#20262D]/90 to-[#15191E]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C90028]" />
            Your Coastal Sanctuary Awaits
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Experience the Warmth of True Indian Hospitality
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Whether you seek a weekend beach retreat on Chennai's ECR, an opulent palace stay in Bengaluru, or an intimate heritage escape in Jaipur, let MGM be your home away from home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/booking"
              className="w-full sm:w-auto bg-[#C90028] hover:bg-[#A50020] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Stay Direct</span>
            </Link>

            <a
              href="tel:+914427472435"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Phone className="w-4 h-4 text-[#C90028]" />
              <span>Call +91 44 2747 2435</span>
            </a>
          </div>

          {/* Direct Guarantee Reassurances */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C90028]" />
              <span>Best Rate Direct Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C90028]" />
              <span>Complimentary Breakfast & Wi-Fi</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C90028]" />
              <span>Flexible 48-Hour Cancellation</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;

