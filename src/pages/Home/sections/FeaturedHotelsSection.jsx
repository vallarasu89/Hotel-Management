import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Heart, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { hotelsData } from '../../../data/hotels';
import { formatCurrency } from '../../../utils/formatters';
import { useAuth } from '../../../context/AuthContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useToast } from '../../../context/ToastContext';
import { HotelCardSkeleton } from '../../../components/skeletons';

export const FeaturedHotelsSection = ({ loading = false }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const toast = useToast();

  // Show top featured hotels
  const featuredHotels = hotelsData.filter(h => h.featured).slice(0, 3);

  const handleWishlistClick = (hotel, isWishlisted) => {
    if (!isAuthenticated) {
      toast.warning('Please sign in to save properties to your MGM Wishlist.');
      navigate('/login');
      return;
    }

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
      toast.success(`Added ${hotel.name} to your Wishlist!`);
    }
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/10 text-[#C90028] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Signature Properties
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20262D]">
              Featured Hotels & Luxury Resorts
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
              Handcrafted havens across prime beachfronts, tranquil garden chalets, and regal metropolitan palaces.
            </p>
          </div>

          <Link
            to="/hotels"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[#C90028] hover:text-[#A50020] group self-start"
          >
            <span>Explore All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <HotelCardSkeleton key={i} />
            ))
          ) : (
            featuredHotels.map((hotel) => {
              const isWishlisted = wishlist.some(w => w.id === hotel.id);

              return (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#DCE2E9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Hotel Image with Badges */}
                  <div className="relative overflow-hidden aspect-[16/11]">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                    {/* Signature Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#C90028] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {hotel.badge}
                      </span>
                    </div>

                    {/* Wishlist Button - Only shown when logged in */}
                    {isAuthenticated && (
                      <button
                        type="button"
                        onClick={() => handleWishlistClick(hotel, isWishlisted)}
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

                  {/* Hotel Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Location and Rating */}
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

                      {/* Hotel Name */}
                      <h3 className="font-serif text-xl font-bold text-[#20262D] group-hover:text-[#C90028] transition-colors mb-1.5">
                        <Link to={`/hotels/${hotel.id}`}>
                          {hotel.name}
                        </Link>
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                        {hotel.tagline}
                      </p>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {hotel.amenities.slice(0, 3).map((amenity, i) => (
                          <span
                            key={i}
                            className="bg-[#F2F5F9] text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-md"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA Buttons */}
                    <div className="pt-4 border-t border-[#F2F5F9] flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-gray-400 block uppercase tracking-wider font-semibold">
                          From per night
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-serif text-xl font-bold text-[#C90028]">
                            {formatCurrency(hotel.pricePerNight)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            {formatCurrency(hotel.originalPrice)}
                          </span>
                        </div>
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
                          className="bg-[#C90028] hover:bg-[#A50020] text-white px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 shadow-sm cursor-pointer"
                        >
                          Book Stay
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};

export default FeaturedHotelsSection;
