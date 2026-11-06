import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Tag, 
  Plus, 
  Minus, 
  ChevronDown, 
  Sparkles 
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { destinationsList } from '../../data/hotels';

export const SearchWidget = ({ className = '', isHero = false }) => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useBooking();

  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const [promoPopoverOpen, setPromoPopoverOpen] = useState(false);
  const [promoInput, setPromoInput] = useState(searchParams.promoCode || '');

  const handleDestinationChange = (e) => {
    setSearchParams(prev => ({ ...prev, destination: e.target.value }));
  };

  const handleDateChange = (field, value) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const updateGuests = (type, delta) => {
    setSearchParams(prev => {
      const current = prev[type] || 0;
      const next = Math.max(type === 'adults' || type === 'rooms' ? 1 : 0, current + delta);
      return { ...prev, [type]: next };
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (promoInput) {
      setSearchParams(prev => ({ ...prev, promoCode: promoInput }));
    }
    navigate(`/hotels?destination=${encodeURIComponent(searchParams.destination)}&checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&rooms=${searchParams.rooms}&adults=${searchParams.adults}`);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`bg-white rounded-2xl shadow-2xl border border-[#DCE2E9] p-4 sm:p-6 lg:p-7 relative transition-all ${
        isHero ? 'mt-4 sm:mt-6' : ''
      }`}>
        
        {/* Subtle top banner if in hero */}
        {isHero && (
          <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-gray-100 text-xs text-gray-600 gap-2">
            <span className="font-semibold text-[#20262D] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C90028]" />
              Book Direct Exclusive Benefits: Complimentary Breakfast & Wi-Fi
            </span>
            <span className="text-gray-500 hidden sm:inline">
              Instant Confirmation • Free Reschedule
            </span>
          </div>
        )}

        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
          
          {/* Destination */}
          <div className="lg:col-span-3 relative">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C90028]" />
              Destination / Resort
            </label>
            <div className="relative">
              <select
                value={searchParams.destination}
                onChange={handleDestinationChange}
                className="w-full bg-[#F2F5F9] hover:bg-[#E5EBF2] border border-transparent focus:border-[#C90028] focus:bg-white text-sm font-semibold text-[#20262D] rounded-xl px-3.5 py-3 appearance-none outline-none transition-colors cursor-pointer"
              >
                <option value="All">All MGM Destinations (India)</option>
                {destinationsList.map(dest => (
                  <option key={dest.id} value={dest.id}>
                    {dest.city}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Check-In Date */}
          <div className="lg:col-span-2 relative">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C90028]" />
              Check-In
            </label>
            <input
              type="date"
              value={searchParams.checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleDateChange('checkIn', e.target.value)}
              className="w-full bg-[#F2F5F9] hover:bg-[#E5EBF2] border border-transparent focus:border-[#C90028] focus:bg-white text-xs sm:text-sm font-semibold text-[#20262D] rounded-xl px-3 py-2.5 outline-none transition-colors cursor-pointer"
              required
            />
          </div>

          {/* Check-Out Date */}
          <div className="lg:col-span-2 relative">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C90028]" />
              Check-Out
            </label>
            <input
              type="date"
              value={searchParams.checkOut}
              min={searchParams.checkIn || new Date().toISOString().split('T')[0]}
              onChange={(e) => handleDateChange('checkOut', e.target.value)}
              className="w-full bg-[#F2F5F9] hover:bg-[#E5EBF2] border border-transparent focus:border-[#C90028] focus:bg-white text-xs sm:text-sm font-semibold text-[#20262D] rounded-xl px-3 py-2.5 outline-none transition-colors cursor-pointer"
              required
            />
          </div>

          {/* Guests & Rooms Popover */}
          <div className="lg:col-span-3 relative">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#C90028]" />
              Guests & Rooms
            </label>
            <button
              type="button"
              onClick={() => setGuestPopoverOpen(!guestPopoverOpen)}
              className="w-full bg-[#F2F5F9] hover:bg-[#E5EBF2] border border-transparent focus:border-[#C90028] text-sm font-semibold text-[#20262D] rounded-xl px-3.5 py-3 text-left flex items-center justify-between transition-colors"
            >
              <span className="truncate">
                {searchParams.adults + searchParams.children} Guests, {searchParams.rooms} Room{searchParams.rooms > 1 ? 's' : ''}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${guestPopoverOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Popover Card */}
            {guestPopoverOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#DCE2E9] p-4 z-50 space-y-4 animate-fadeIn">
                {/* Adults */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-[#20262D]">Adults</div>
                    <div className="text-xs text-gray-500">Ages 12+ years</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', -1)}
                      disabled={searchParams.adults <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{searchParams.adults}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div>
                    <div className="text-sm font-bold text-[#20262D]">Children</div>
                    <div className="text-xs text-gray-500">Ages 0 - 11 years</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('children', -1)}
                      disabled={searchParams.children <= 0}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{searchParams.children}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('children', 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div>
                    <div className="text-sm font-bold text-[#20262D]">Rooms</div>
                    <div className="text-xs text-gray-500">Max 4 per booking</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('rooms', -1)}
                      disabled={searchParams.rooms <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{searchParams.rooms}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('rooms', 1)}
                      disabled={searchParams.rooms >= 4}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setGuestPopoverOpen(false)}
                  className="w-full bg-[#20262D] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#15191E]"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2 flex flex-col justify-end pt-2 sm:pt-0">
            <button
              type="submit"
              className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-3.5 px-4 rounded-xl text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Search</span>
            </button>
          </div>

        </form>

        {/* Promo Code Link / Input Toggle */}
        <div className="mt-3 pt-2 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!promoPopoverOpen ? (
              <button
                type="button"
                onClick={() => setPromoPopoverOpen(true)}
                className="text-[#C90028] font-medium hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5" />
                Have a Promo / Corporate Code?
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Code (e.g. MGMROYAL25)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  className="bg-[#F2F5F9] border border-gray-300 rounded-lg px-2.5 py-1 text-xs uppercase font-bold outline-none focus:border-[#C90028]"
                />
                <button
                  type="button"
                  onClick={() => setPromoPopoverOpen(false)}
                  className="text-gray-500 hover:text-black font-semibold text-xs"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3 text-gray-500">
            <span>Special rates for Defense & Senior Citizens available at check-in</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchWidget;

