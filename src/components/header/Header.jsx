import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  MapPin,
  Calendar,
  LogOut,
  UserCheck,
  Award,
  LogIn,
  UserPlus,
  Camera,
  Info,
  PhoneCall,
  Compass,
  BookOpen,
  BedDouble
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { hotelsData } from '../../data/hotels';
import mgmLogo from '../../assets/mgm-logo-dark.png';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const moreRef = useRef(null);

  const { user, isAuthenticated, logout } = useAuth();
  const { wishlist } = useWishlist();
  const toast = useToast();

  // Scroll detection for compact navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside & Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setAccountDropdownOpen(false);
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDestinationsOpen(false);
    setAccountDropdownOpen(false);
    setMoreDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setAccountDropdownOpen(false);
    toast.info('You have been signed out of MGM Privilege.');
    navigate('/');
  };

  // Primary links visible on lg and xl
  const primaryLinks = [
    { name: 'Hotels & Resorts', path: '/hotels', hasDropdown: true },
    { name: 'Rooms & Suites', path: '/rooms' },
    { name: 'Special Offers', path: '/offers' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Travel Journal', path: '/blog' }
  ];

  // Secondary links: grouped under "More ▾" on lg (1024-1279px), shown inline on xl (>= 1280px)
  const secondaryLinks = [
    { name: 'Gallery', path: '/gallery', icon: Camera },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: PhoneCall }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-shadow duration-300">

      {/* Top Utility Bar (Hidden on Mobile/Tablet < 768px) */}
      <div
        className={`bg-[#15191E] text-white border-b border-[#20262D] hidden md:block transition-all duration-300 ${isScrolled ? 'max-h-0 opacity-0 overflow-hidden py-0 border-none' : 'max-h-12 opacity-100 py-1.5'
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 flex justify-between items-center text-xs">

          {/* Left: Official Guarantee, Phone, Email */}
          <div className="flex items-center gap-4 lg:gap-6 text-gray-300 whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C90028]" />
              Official Website — Best Rate Guarantee
            </span>
            <a
              href="tel:+914427472435"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C90028]" />
              <span>+91 44 2747 2435</span>
            </a>
            <a
              href="mailto:reservations@mgm-hotels.com"
              className="hidden xl:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-[#C90028]" />
              <span>reservations@mgm-hotels.com</span>
            </a>
          </div>

          {/* Right: Summer Offers & Auth State */}
          <div className="flex items-center gap-3 lg:gap-4 whitespace-nowrap">
            <Link
              to="/offers"
              className="flex items-center gap-1 text-[#C90028] hover:text-red-400 font-bold tracking-wider uppercase text-[11px]"
            >
              <Sparkles className="w-3 h-3" />
              <span>Special Summer Offers</span>
            </Link>
            <span className="text-gray-600">|</span>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/account"
                  className="hover:text-white text-gray-300 font-semibold transition-colors flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#C90028]" />
                  <span>Welcome, {user?.firstName}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-400 transition-colors font-medium cursor-pointer"
                  title="Sign out"
                >
                  (Log Out)
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hover:text-white text-gray-300 transition-colors font-medium"
                >
                  Member Sign In
                </Link>
                <span className="text-gray-600">/</span>
                <Link
                  to="/signup"
                  className="hover:text-white text-gray-300 transition-colors font-medium"
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${isScrolled
            ? 'bg-[#20262D]/95 backdrop-blur-md shadow-2xl py-2.5 sm:py-3 text-white'
            : 'bg-[#20262D] text-white py-3 sm:py-3.5 border-b border-white/5'
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">

          {/* Official MGM - M.G. Muthu Group Brand Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 py-0.5" title="MGM Hotels & Resorts Home">
            <img
              src={mgmLogo}
              alt="MGM - M.G. Muthu Group | Hotels & Resorts"
              className="h-7 sm:h-9 md:h-10 lg:h-10 xl:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links (Visible on lg >= 1024px) */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 2xl:gap-2 flex-1 justify-center max-w-5xl px-1 lg:px-2">

            {/* Primary Nav Links */}
            {primaryLinks.map((link) => (
              <div key={link.name} className="relative group shrink-0">
                <Link
                  to={link.path}
                  className={`text-xs xl:text-[13px] 2xl:text-sm font-semibold tracking-wide py-1.5 xl:py-2 px-1.5 lg:px-2 xl:px-2.5 rounded-lg transition-colors flex items-center gap-0.5 xl:gap-1 whitespace-nowrap ${location.pathname === link.path
                      ? 'text-[#C90028] font-bold bg-white/5'
                      : 'text-gray-200 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className="whitespace-nowrap">{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200 shrink-0" />
                  )}
                </Link>

                {/* Dropdown for Hotels */}
                {link.hasDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-80 max-w-[calc(100vw-2rem)] bg-[#15191E] border border-white/10 rounded-xl shadow-2xl py-3 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-3 py-1.5 text-xs font-semibold tracking-wider text-gray-400 uppercase border-b border-white/10 mb-2 flex items-center justify-between">
                      <span>Our Destinations</span>
                      <span className="text-[10px] text-[#C90028] font-bold">6 Properties</span>
                    </div>
                    {hotelsData.map((hotel) => (
                      <Link
                        key={hotel.id}
                        to={`/hotels/${hotel.id}`}
                        className="flex items-start gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-gray-200 hover:text-white group/item"
                      >
                        <MapPin className="w-4 h-4 text-[#C90028] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium text-white text-xs">{hotel.name}</div>
                          <div className="text-[11px] text-gray-400">{hotel.city}, {hotel.state}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-white/10 px-2">
                      <Link
                        to="/hotels"
                        className="block text-center text-xs font-bold text-[#C90028] hover:underline py-1"
                      >
                        Explore All Properties →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Secondary Nav Links: Inline on 2xl (>= 1536px) */}
            <div className="hidden 2xl:flex items-center gap-1 xl:gap-1.5 2xl:gap-2 shrink-0">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs xl:text-sm font-semibold tracking-wide py-2 px-2.5 rounded-lg transition-colors whitespace-nowrap ${location.pathname === link.path
                      ? 'text-[#C90028] font-bold bg-white/5'
                      : 'text-gray-200 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* "More ▾" Dropdown: Visible on lg and xl (< 1536px) to prevent navbar overflow */}
            <div className="relative 2xl:hidden shrink-0" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`text-xs xl:text-[13px] font-semibold tracking-wide py-1.5 xl:py-2 px-2 xl:px-2.5 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${secondaryLinks.some(l => location.pathname === l.path)
                    ? 'text-[#C90028] font-bold bg-white/5'
                    : 'text-gray-200 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 max-w-[calc(100vw-2rem)] bg-[#15191E] border border-white/10 rounded-xl shadow-2xl py-2 px-1 z-50 text-white animate-fadeIn">
                  {secondaryLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${location.pathname === link.path
                            ? 'bg-[#C90028] text-white'
                            : 'text-gray-200 hover:bg-white/10 hover:text-white'
                          }`}
                      >
                        <IconComponent className="w-3.5 h-3.5 text-[#C90028]" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 shrink-0">

            {/* FAVORITES (WISHLIST HEART): STRICTLY SHOWN ONLY AFTER LOGIN */}
            {isAuthenticated && (
              <Link
                to="/account/wishlist"
                className="relative p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                title={`Saved Hotels & Suites (${wishlist.length})`}
              >
                <Heart className="w-5 h-5 text-gray-200 hover:text-red-400 transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C90028] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            )}

            {/* Account Dropdown Trigger (Hidden on tiny mobile < 400px to ensure Book Now and Menu fit cleanly) */}
            <div className="relative hidden xs:block sm:block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className={`flex items-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-full border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${isAuthenticated
                    ? 'border-[#C90028]/60 bg-[#C90028]/10 text-white hover:border-[#C90028]'
                    : 'border-white/20 text-gray-200 hover:text-white hover:border-white/40'
                  }`}
              >
                <User className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isAuthenticated ? 'text-[#C90028]' : 'text-gray-300'}`} />
                <span className="max-w-[85px] sm:max-w-none truncate">
                  {isAuthenticated ? user?.firstName : 'Sign In'}
                </span>
                <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70 transition-transform ${accountDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Account Dropdown Menu */}
              {accountDropdownOpen && (
                <div className={`absolute right-0 top-full mt-2 ${isAuthenticated ? 'w-72 sm:w-80 p-3' : 'w-56 sm:w-60 p-2.5'} max-w-[calc(100vw-2rem)] bg-[#15191E] border border-white/15 rounded-2xl shadow-2xl z-50 text-white animate-fadeIn`}>
                  {isAuthenticated ? (
                    <div>
                      {/* User Info Header */}
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 mb-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#C90028]"
                          />
                          <div className="overflow-hidden">
                            <div className="font-bold text-sm text-white truncate">{user?.name}</div>
                            <div className="text-[11px] text-amber-300 flex items-center gap-1">
                              <Award className="w-3 h-3 text-[#C90028]" />
                              <span>{user?.tier || 'Gold Member'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10 flex justify-between text-[11px] text-gray-400">
                          <span>Reward Balance:</span>
                          <span className="font-bold text-white">{user?.points?.toLocaleString('en-IN') || '14,850'} Pts</span>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="space-y-1 text-xs">
                        <Link
                          to="/account"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
                        >
                          <User className="w-4 h-4 text-[#C90028]" />
                          <span>My Profile & Preferences</span>
                        </Link>
                        <Link
                          to="/account/bookings"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-[#C90028]" />
                          <span>My Stay Reservations</span>
                        </Link>
                        <Link
                          to="/account/wishlist"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-[#C90028]" />
                            <span>Saved Wishlist</span>
                          </div>
                          <span className="bg-[#C90028] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                            {wishlist.length}
                          </span>
                        </Link>
                      </div>

                      {/* Log Out CTA */}
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-red-400 hover:text-white hover:bg-red-950/40 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-[#C90028]" />
                          <span>Sign Out / Log Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-1 space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="w-full bg-[#C90028] hover:bg-[#A50020] text-white py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                      </Link>

                      <Link
                        to="/signup"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Join Privilege Club</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Signature Red Book Button (Responsive across all screen sizes) */}
            <Link
              to="/booking"
              className="bg-[#C90028] hover:bg-[#A50020] text-white px-2.5 sm:px-3.5 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1 sm:gap-1.5 active:scale-95 whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Book Now</span>
            </Link>

            {/* Mobile / Tablet Hamburger Button (Visible on < 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay (< 1024px) */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-[#15191E] border-t border-white/10 shadow-2xl max-h-[calc(100vh-65px)] overflow-y-auto px-4 sm:px-6 pt-4 pb-8 space-y-4 animate-fadeIn">

            {/* Authenticated Member Card or Unauthenticated Guest Card */}
            {isAuthenticated ? (
              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#C90028]"
                    />
                    <div>
                      <div className="font-bold text-sm text-white">{user?.name}</div>
                      <div className="text-[11px] text-amber-300 flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#C90028]" />
                        <span>{user?.tier || 'Gold Member'} • {user?.points?.toLocaleString('en-IN') || '14,850'} Pts</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
                  <Link
                    to="/account"
                    className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-gray-200 font-medium"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/account/bookings"
                    className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-gray-200 font-medium"
                  >
                    Reservations
                  </Link>
                  <Link
                    to="/account/wishlist"
                    className="py-1.5 px-2 rounded-lg bg-[#C90028]/20 border border-[#C90028]/40 text-[11px] text-white font-bold flex items-center justify-center gap-1"
                  >
                    <Heart className="w-3 h-3 text-[#C90028] fill-[#C90028]" />
                    <span>Wishlist ({wishlist.length})</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-gradient-to-r from-white/5 to-white/[0.02] rounded-xl border border-white/10 space-y-3">
                <div className="text-xs text-gray-300">
                  <span className="font-bold text-white block mb-0.5">MGM Privilege Club</span>
                  Sign in to access members-only rates, room upgrades & saved wishlists.
                </div>
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="flex-1 text-center py-2 px-3 rounded-lg bg-[#C90028] text-white text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="flex-1 text-center py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1"
                  >
                    Join
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Links Accordion / List */}
            <div className="space-y-1">

              {/* Hotels Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setDestinationsOpen(!destinationsOpen)}
                  className="w-full flex justify-between items-center py-2.5 px-3 rounded-lg text-left text-gray-200 hover:bg-white/10 font-medium text-sm cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C90028]" />
                    <span>Hotels & Resorts</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${destinationsOpen ? 'rotate-180' : ''}`} />
                </button>
                {destinationsOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1.5 bg-black/25 rounded-lg my-1">
                    {hotelsData.map(hotel => (
                      <Link
                        key={hotel.id}
                        to={`/hotels/${hotel.id}`}
                        className="flex items-center justify-between py-1.5 px-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded"
                      >
                        <span>{hotel.name}</span>
                        <span className="text-[10px] text-gray-500">{hotel.city}</span>
                      </Link>
                    ))}
                    <div className="pt-1.5 border-t border-white/10">
                      <Link
                        to="/hotels"
                        className="block py-1 text-xs font-bold text-[#C90028] hover:underline"
                      >
                        View All Hotels & Resorts →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              {[
                { name: 'Rooms & Suites', path: '/rooms', icon: BedDouble },
                { name: 'Special Offers', path: '/offers', icon: Sparkles },
                { name: 'Experiences', path: '/experiences', icon: Compass },
                { name: 'Gallery', path: '/gallery', icon: Camera },
                { name: 'Travel Journal', path: '/blog', icon: BookOpen },
                { name: 'About Us', path: '/about', icon: Info },
                { name: 'Contact Us', path: '/contact', icon: PhoneCall },
              ].map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                        ? 'bg-[#C90028] text-white font-bold'
                        : 'text-gray-200 hover:bg-white/10'
                      }`}
                  >
                    <IconComponent className="w-4 h-4 text-[#C90028]" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Contact & Booking Actions */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <Link
                to="/booking"
                className="w-full bg-[#C90028] hover:bg-[#A50020] text-center text-white font-bold py-3 rounded-xl uppercase tracking-wider text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Your Luxury Stay</span>
              </Link>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2 px-1">
                <a
                  href="tel:+914427472435"
                  className="flex items-center gap-1.5 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C90028]" />
                  <span>+91 44 2747 2435</span>
                </a>
                <a
                  href="mailto:reservations@mgm-hotels.com"
                  className="flex items-center gap-1.5 hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C90028]" />
                  <span>reservations@mgm-hotels.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;