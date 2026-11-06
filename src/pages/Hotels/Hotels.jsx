import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Filter, 
  MapPin, 
  Star, 
  Heart, 
  ArrowUpDown, 
  RotateCcw, 
  Eye, 
  Calendar,
  Sparkles 
} from 'lucide-react';
import { hotelsData } from '../../data/hotels';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { HotelCardSkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';

export const Hotels = () => {
  const [urlParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const toast = useToast();

  const initialCity = urlParams.get('destination') || 'All';

  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { loading } = useAsyncData(hotelsData, 500);

  // Filter & Sort Logic
  const filteredHotels = useMemo(() => {
    return hotelsData.filter(hotel => {
      if (selectedCity !== 'All' && !hotel.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'All' && hotel.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (hotel.pricePerNight > maxPrice) {
        return false;
      }
      if (hotel.rating < minRating) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-high') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // default popular
    });
  }, [selectedCity, selectedCategory, maxPrice, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCity('All');
    setSelectedCategory('All');
    setMaxPrice(15000);
    setMinRating(0);
    setSortBy('popular');
  };

  return (
    <>
      <Helmet>
        <title>Our Luxury Hotels & Resorts | MGM India Official</title>
        <meta name="description" content="Discover MGM's award-winning coastal resorts, heritage havelis, and luxury city hotels across India. Enjoy best rate guarantee and flexible booking." />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-[#15191E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#20262D]/60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C90028]" />
            MGM Hospitality Portfolio
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Our Hotels, Resorts & Palaces
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            From the tranquil shores of East Coast Road to the royal courts of Jaipur, find your perfect sanctuary with signature Indian warmth.
          </p>
        </div>
      </div>

      {/* Main Content with Filter Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#DCE2E9] gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-[#20262D]">
              {filteredHotels.length} Properties Found
            </span>
            {selectedCity !== 'All' && (
              <span className="bg-[#C90028]/10 text-[#C90028] text-xs font-bold px-2.5 py-1 rounded-full">
                in {selectedCity}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-[#DCE2E9] rounded-xl text-xs font-bold text-[#20262D]"
            >
              <Filter className="w-4 h-4 text-[#C90028]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#DCE2E9] rounded-xl px-3 py-2 text-xs font-semibold text-[#20262D] outline-none cursor-pointer focus:border-[#C90028]"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Guest Rating (High to Low)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Filters Sidebar + Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 bg-white p-6 rounded-2xl border border-[#DCE2E9] shadow-sm space-y-6 ${
            mobileFilterOpen ? 'block fixed inset-0 z-50 overflow-y-auto m-4 bg-white shadow-2xl' : 'hidden lg:block'
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-serif text-lg font-bold text-[#20262D] flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#C90028]" />
                Filter Stays
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-gray-500 hover:text-[#C90028] flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Destination / City */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Destination
              </label>
              <div className="space-y-1.5">
                {['All', 'Chennai', 'Bengaluru', 'Jaipur', 'Vailankanni', 'Ranipet'].map(city => (
                  <label key={city} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-[#C90028]">
                    <input
                      type="radio"
                      name="destination"
                      checked={selectedCity === city}
                      onChange={() => setSelectedCity(city)}
                      className="accent-[#C90028]"
                    />
                    <span>{city === 'All' ? 'All Destinations' : city}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Property Category */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Property Type
              </label>
              <div className="space-y-1.5">
                {['All', 'Resort', 'City Hotel', 'Heritage', 'Highway Resort'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-[#C90028]">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-[#C90028]"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-gray-500">Max Tariff</span>
                <span className="font-bold text-[#C90028]">{formatCurrency(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="3500"
                max="15000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C90028] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>₹3,500</span>
                <span>₹15,000+</span>
              </div>
            </div>

            {/* Guest Rating Filter */}
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Minimum Guest Rating
              </label>
              <div className="space-y-1.5">
                {[
                  { label: 'Any Rating', val: 0 },
                  { label: '4.5 ★ & Above', val: 4.5 },
                  { label: '4.7 ★ & Above', val: 4.7 },
                  { label: '4.8 ★ & Above', val: 4.8 }
                ].map(r => (
                  <label key={r.val} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-[#C90028]">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r.val}
                      onChange={() => setMinRating(r.val)}
                      className="accent-[#C90028]"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#C90028] text-white py-3 rounded-xl font-bold uppercase text-xs"
              >
                Apply Filters & Close
              </button>
            )}
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <HotelCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredHotels.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#DCE2E9] space-y-4">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#20262D]">No Hotels Matched Your Criteria</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Try broadening your price range or clearing destination filters to view more MGM properties.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#C90028] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#A50020] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHotels.map((hotel) => {
                  const isWishlisted = wishlist.some(w => w.id === hotel.id);

                  return (
                    <div
                      key={hotel.id}
                      className="bg-white rounded-2xl overflow-hidden border border-[#DCE2E9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Image */}
                        <div className="relative overflow-hidden aspect-[16/11]">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#C90028] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                              {hotel.badge}
                            </span>
                          </div>
                          {/* Wishlist Button - Only shown when logged in */}
                          {isAuthenticated && (
                            <button
                              type="button"
                              onClick={() => {
                                toggleWishlist({
                                  id: hotel.id,
                                  type: 'hotel',
                                  name: hotel.name,
                                  city: hotel.city,
                                  pricePerNight: hotel.pricePerNight,
                                  rating: hotel.rating,
                                  image: hotel.image
                                });
                                if (isWishlisted) {
                                  toast.info(`Removed ${hotel.name} from Wishlist`);
                                } else {
                                  toast.success(`Saved ${hotel.name} to Wishlist!`);
                                }
                              }}
                              className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                isWishlisted
                                  ? 'bg-[#C90028] text-white'
                                  : 'bg-black/40 hover:bg-white text-white hover:text-[#C90028] backdrop-blur-sm'
                              }`}
                              aria-label="Save to wishlist"
                            >
                              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                            </button>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <div className="flex items-center gap-1 text-gray-600 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-[#C90028]" />
                              <span>{hotel.city}, {hotel.state}</span>
                            </div>
                            <div className="flex items-center gap-1 font-bold text-[#20262D]">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{hotel.rating}</span>
                              <span className="text-gray-400 font-normal">({hotel.reviewsCount})</span>
                            </div>
                          </div>

                          <h3 className="font-serif text-xl font-bold text-[#20262D] group-hover:text-[#C90028] transition-colors mb-2">
                            <Link to={`/hotels/${hotel.id}`}>
                              {hotel.name}
                            </Link>
                          </h3>

                          <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                            {hotel.tagline}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {hotel.amenities.slice(0, 3).map((a, i) => (
                              <span key={i} className="bg-[#F2F5F9] text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-md">
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="p-6 pt-0 border-t border-[#F2F5F9] flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-[11px] text-gray-400 block uppercase font-semibold">From per night</span>
                          <span className="font-serif text-xl font-bold text-[#C90028]">
                            {formatCurrency(hotel.pricePerNight)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/hotels/${hotel.id}`}
                            className="px-3 py-2 rounded-lg border border-[#DCE2E9] hover:border-[#20262D] text-xs font-semibold text-[#20262D] transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </Link>
                          <button
                            onClick={() => navigate(`/booking?hotelId=${hotel.id}`)}
                            className="bg-[#C90028] hover:bg-[#A50020] text-white px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 shadow-sm"
                          >
                            Book
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </>
  );
};

export default Hotels;

