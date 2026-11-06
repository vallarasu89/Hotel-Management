import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Send, 
  CheckCircle
} from 'lucide-react';
import mgmLogo from '../../assets/mgm-logo-dark.png';

export const Footer = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#15191E] text-white pt-16 pb-8 border-t border-[#20262D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Club Banner */}
        <div className="bg-[#20262D] rounded-2xl p-6 sm:p-10 mb-16 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#C90028]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold tracking-widest text-[#C90028] uppercase flex items-center gap-1.5 mb-2">
                <Award className="w-4 h-4" />
                MGM Privilege Club
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Unlock Exclusive Members-Only Tariffs & Upgrades
              </h3>
              <p className="text-gray-300 text-sm max-w-xl">
                Subscribe to our curated newsletter to receive secret seasonal packages, private invitation dining discounts, and instant 1,000 bonus welcome points.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-3 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-4 py-3.5 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-sm font-medium">Thank you for subscribing to MGM Privilege! Check your inbox shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="flex-1 bg-[#15191E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C90028] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#C90028] hover:bg-[#A50020] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Story & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group" title="MGM Hotels & Resorts Home">
              <img 
                src={mgmLogo} 
                alt="MGM - M.G. Muthu Group | Hotels & Resorts" 
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105" 
              />
              <div className="flex flex-col border-l border-white/20 pl-3 leading-tight">
                <span className="text-xs font-bold tracking-[0.22em] text-white uppercase font-sans">
                  Hotels & Resorts
                </span>
                <span className="text-[10px] font-bold tracking-[0.28em] text-[#C90028] uppercase font-sans">
                  India
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed pr-4">
              Pioneering warm Indian coastal and heritage hospitality since 1991. From sun-kissed Bay of Bengal retreats to royal havelis, we create timeless memories of grace, culinary artistry, and restorative luxury.
            </p>

            <div className="space-y-2.5 text-sm text-gray-300 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C90028] shrink-0 mt-1" />
                <span>MGM Corporate Office: 1/74 East Coast Road, Muttukadu, Chennai 603112, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C90028] shrink-0" />
                <span>Toll-Free Reservations: +91 44 2747 2435</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C90028] shrink-0" />
                <span>concierge@mgm-hotels.com</span>
              </div>
            </div>

            {/* Social Icons (Clean Inline SVGs) */}
            <div className="flex items-center gap-3 pt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C90028] text-gray-300 hover:text-white flex items-center justify-center transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C90028] text-gray-300 hover:text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C90028] text-gray-300 hover:text-white flex items-center justify-center transition-colors" aria-label="X (Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C90028] text-gray-300 hover:text-white flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C90028] text-gray-300 hover:text-white flex items-center justify-center transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Our Properties */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2">
              Our Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/hotels/mgm-beach-resort" className="hover:text-[#C90028] transition-colors block">
                  MGM Beach Resorts, Chennai ECR
                </Link>
                <span className="text-xs text-gray-500">Muttukadu Beachfront</span>
              </li>
              <li>
                <Link to="/hotels/mgm-eastwoods" className="hover:text-[#C90028] transition-colors block">
                  MGM Eastwoods, Chennai
                </Link>
                <span className="text-xs text-gray-500">Injambakkam Garden Resort</span>
              </li>
              <li>
                <Link to="/hotels/mgm-grand-bangalore" className="hover:text-[#C90028] transition-colors block">
                  MGM Grand Palace, Bengaluru
                </Link>
                <span className="text-xs text-gray-500">Vasanth Nagar Luxury Hotel</span>
              </li>
              <li>
                <Link to="/hotels/mgm-heritage-jaipur" className="hover:text-[#C90028] transition-colors block">
                  MGM Heritage Haveli, Jaipur
                </Link>
                <span className="text-xs text-gray-500">Royal Heritage Stay</span>
              </li>
              <li>
                <Link to="/hotels/mgm-vailankanni-residency" className="hover:text-[#C90028] transition-colors block">
                  MGM Vailankanni Residency
                </Link>
                <span className="text-xs text-gray-500">Spiritual & Family Haven</span>
              </li>
              <li>
                <Link to="/hotels/mgm-hi-way-ranipet" className="hover:text-[#C90028] transition-colors block">
                  MGM Hi-Way Resort, Ranipet
                </Link>
                <span className="text-xs text-gray-500">Expressway Transit Oasis</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/rooms" className="hover:text-[#C90028] transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#C90028] transition-colors">
                  Special Packages
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-[#C90028] transition-colors">
                  Dining & Experiences
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#C90028] transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#C90028] transition-colors">
                  Travel Journal
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C90028] transition-colors">
                  About Our Legacy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C90028] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C90028] transition-colors">
                  Contact Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Awards & Guarantees */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide border-b border-white/10 pb-2">
              Accreditation & Trust
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-8 h-8 text-[#C90028] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-white uppercase tracking-wider">Official Direct Booking</div>
                  <div className="text-gray-400">Guaranteed lowest rate with 0% extra fees</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <Award className="w-8 h-8 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-white uppercase tracking-wider">Tripadvisor Best of Best</div>
                  <div className="text-gray-400">Ranked top 1% luxury coastal resorts 2024</div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-gray-400">
              <span>Secure simulated checkout for demonstration. Compliant with frontend-only architecture.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <div>
            © {new Date().getFullYear()} MGM Hotels & Resorts India. All rights reserved. Warmth of True Indian Hospitality.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link to="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
