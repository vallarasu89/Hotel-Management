import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  Star, 
  Heart, 
  Share2, 
  Check, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  Calendar,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { hotelsData } from '../../data/hotels';
import { roomsData } from '../../data/rooms';
import { testimonialsData } from '../../data/testimonials';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { useBooking } from '../../context/BookingContext';
import { HotelDetailsSkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';

export const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const toast = useToast();
  const { searchParams, setSearchParams, setCurrentBooking } = useBooking();

  const hotel = hotelsData.find(h => h.id === id) || hotelsData[0];
  const { loading } = useAsyncData(hotel, 500);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(hotel.roomTypes[0] || 'deluxe-cottage');

  // Rooms available at this property
  const availableRooms = roomsData.filter(r => r.hotelId === hotel.id || hotel.roomTypes.includes(r.id));

  const isWishlisted = wishlist.some(w => w.id === hotel.id);

  const handleBookRoom = (room) => {
    setCurrentBooking(prev => ({
      ...prev,
      hotel,
      room
    }));
    navigate(`/checkout?hotelId=${hotel.id}&roomId=${room.id}`);
  };

  if (loading) {
    return <HotelDetailsSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>{hotel.name} | MGM Hotels & Resorts India</title>
        <meta name="description" content={hotel.description.slice(0, 160)} />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Breadcrumbs & Header Bar */}
        <div className="bg-white border-b border-[#DCE2E9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                <Link to="/" className="hover:text-[#C90028]">Home</Link>
                <ChevronRight className="w-3 h-3 text-gray-400" />
                <Link to="/hotels" className="hover:text-[#C90028]">Hotels</Link>
                <ChevronRight className="w-3 h-3 text-gray-400" />
                <span className="text-[#20262D] font-bold">{hotel.name}</span>
              </nav>

              {/* Wishlist Button - Only shown when logged in */}
              {isAuthenticated && (
                <div className="flex items-center gap-3">
                  <button
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
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      isWishlisted 
                        ? 'bg-[#C90028] text-white border-[#C90028]' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hotel Title Hero Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#C90028] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {hotel.badge}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-[#20262D]">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating}</span>
                  <span className="text-gray-500 font-normal">({hotel.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#20262D] mb-2">
                {hotel.name}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#C90028] shrink-0" />
                <span>{hotel.address}</span>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-gray-500 block uppercase font-semibold">Starting From</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-black text-[#C90028]">
                  {formatCurrency(hotel.pricePerNight)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(hotel.originalPrice)}
                </span>
                <span className="text-xs text-gray-500">/ night</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery Showcase */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Main Showcase Image */}
            <div className="md:col-span-8 rounded-2xl overflow-hidden shadow-lg h-[340px] sm:h-[480px]">
              <img
                src={hotel.images[activeImageIndex] || hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnail Column */}
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4 h-[340px] sm:h-[480px]">
              {hotel.images.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx + 1)}
                  className={`rounded-2xl overflow-hidden cursor-pointer h-full relative group border-2 ${
                    activeImageIndex === idx + 1 ? 'border-[#C90028]' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt="Gallery thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Body: Details & Live Room Selection */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#20262D]">
                About {hotel.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {hotel.description}
              </p>

              {/* Highlights List */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-sm text-[#20262D] uppercase tracking-wider mb-3">
                  Signature Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {hotel.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Sparkles className="w-4 h-4 text-[#C90028] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#20262D]">
                Resort Amenities & Facilities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F2F5F9] text-xs font-semibold text-gray-800">
                    <Check className="w-4 h-4 text-[#C90028] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Categories at this Property */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#20262D]">
                    Available Rooms & Suites
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Instant confirmation • Free cancellation 48h prior
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {availableRooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-white rounded-2xl border border-[#DCE2E9] overflow-hidden shadow-sm hover:shadow-md transition-all grid grid-cols-1 sm:grid-cols-12"
                  >
                    <div className="sm:col-span-5 relative aspect-[16/11] sm:aspect-auto">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#20262D]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                        {room.category}
                      </span>
                    </div>

                    <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-serif text-xl font-bold text-[#20262D]">
                            {room.name}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{room.tagline}</p>

                        <div className="flex flex-wrap gap-3 text-xs text-gray-600 pb-3 border-b border-gray-100">
                          <span>{room.size}</span>
                          <span>•</span>
                          <span>{room.bedType}</span>
                          <span>•</span>
                          <span>{room.maxOccupancy.adults} Adults Max</span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold block">Rate per night</span>
                          <span className="font-serif text-2xl font-bold text-[#C90028]">
                            {formatCurrency(room.pricePerNight)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/rooms/${room.id}`}
                            className="px-3.5 py-2 rounded-xl border border-gray-300 hover:border-black text-xs font-semibold"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => handleBookRoom(room)}
                            className="bg-[#C90028] hover:bg-[#A50020] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md active:scale-95 cursor-pointer"
                          >
                            Reserve
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Contact Guide */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#20262D]">
                Location & Accessibility
              </h2>
              <p className="text-sm text-gray-600">
                {hotel.address}. Located conveniently along the scenic coastal corridor with direct beachfront and seamless airport transit access.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F2F5F9]">
                  <Phone className="w-5 h-5 text-[#C90028]" />
                  <div>
                    <div className="text-xs text-gray-500">Concierge Desk</div>
                    <div className="text-sm font-bold text-[#20262D]">{hotel.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F2F5F9]">
                  <Mail className="w-5 h-5 text-[#C90028]" />
                  <div>
                    <div className="text-xs text-gray-500">Direct Reservations</div>
                    <div className="text-sm font-bold text-[#20262D]">{hotel.email}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Quick Booking Card */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE2E9] shadow-lg space-y-5">
              
              <div className="pb-4 border-b border-gray-100">
                <span className="text-xs uppercase font-bold text-gray-400">Guaranteed Best Rate</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-3xl font-black text-[#C90028]">
                    {formatCurrency(hotel.pricePerNight)}
                  </span>
                  <span className="text-xs text-gray-500">/ night + taxes</span>
                </div>
              </div>

              {/* Booking params */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-[#F2F5F9] rounded-xl">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Check-In</label>
                    <input
                      type="date"
                      value={searchParams.checkIn}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, checkIn: e.target.value }))}
                      className="bg-transparent text-xs font-bold text-[#20262D] outline-none w-full"
                    />
                  </div>
                  <div className="p-3 bg-[#F2F5F9] rounded-xl">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Check-Out</label>
                    <input
                      type="date"
                      value={searchParams.checkOut}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value }))}
                      className="bg-transparent text-xs font-bold text-[#20262D] outline-none w-full"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#F2F5F9] rounded-xl">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Guests & Rooms</label>
                  <div className="text-xs font-bold text-[#20262D] mt-0.5">
                    {searchParams.adults} Adults, {searchParams.children} Children • {searchParams.rooms} Room
                  </div>
                </div>
              </div>

              {/* Direct Booking Perks */}
              <div className="space-y-2 py-3 border-y border-gray-100 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Free cancellation up to 48 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Complimentary high-speed Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Early check-in subject to availability</span>
                </div>
              </div>

              <button
                onClick={() => handleBookRoom(availableRooms[0] || roomsData[0])}
                className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm shadow-xl active:scale-95 transition-all cursor-pointer"
              >
                Book This Resort Now
              </button>

            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default HotelDetails;

