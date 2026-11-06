import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Maximize2, 
  Bed, 
  Users, 
  Check, 
  Sparkles, 
  Filter, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { roomsData } from '../../data/rooms';
import { formatCurrency } from '../../utils/formatters';
import { RoomCardSkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';
import { useBooking } from '../../context/BookingContext';
import { hotelsData } from '../../data/hotels';

export const Rooms = () => {
  const navigate = useNavigate();
  const { setCurrentBooking } = useBooking();
  const { loading } = useAsyncData(roomsData, 500);

  const [selectedType, setSelectedType] = useState('All');
  const [selectedHotel, setSelectedHotel] = useState('All');
  const [maxPrice, setMaxPrice] = useState(30000);

  const filteredRooms = useMemo(() => {
    return roomsData.filter(room => {
      if (selectedType !== 'All' && room.type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }
      if (selectedHotel !== 'All' && room.hotelId !== selectedHotel) {
        return false;
      }
      if (room.pricePerNight > maxPrice) {
        return false;
      }
      return true;
    });
  }, [selectedType, selectedHotel, maxPrice]);

  const handleBookNow = (room) => {
    const hotel = hotelsData.find(h => h.id === room.hotelId) || hotelsData[0];
    setCurrentBooking(prev => ({
      ...prev,
      hotel,
      room
    }));
    navigate(`/checkout?hotelId=${room.hotelId}&roomId=${room.id}`);
  };

  return (
    <>
      <Helmet>
        <title>Luxury Rooms, Beach Cottages & Suites | MGM Hotels India</title>
        <meta name="description" content="Explore handcrafted accommodation choices from sea-facing cottages to presidential villas with private plunge pools across MGM properties." />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-[#15191E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#20262D]/60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C90028]" />
            Sanctuaries of Rest
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Rooms, Coastal Cottages & Royal Suites
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Thoughtfully designed with authentic teakwood craftsmanship, open-to-sky shower pavilions, and panoramic ocean vistas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filters Bar */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCE2E9] shadow-sm mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#C90028]" />
              Type:
            </span>
            {['All', 'Cottage', 'Suite', 'Villa', 'Room'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  selectedType === type
                    ? 'bg-[#20262D] text-white'
                    : 'bg-[#F2F5F9] text-gray-600 hover:bg-[#E5EBF2]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
              className="bg-[#F2F5F9] border border-transparent focus:border-[#C90028] text-xs font-semibold text-[#20262D] rounded-xl px-3 py-2 outline-none cursor-pointer"
            >
              <option value="All">All MGM Resorts</option>
              {hotelsData.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Room List (Horizontal Editorial Cards) */}
        <div className="space-y-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <RoomCardSkeleton key={i} horizontal={true} />
            ))
          ) : (
            filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl border border-[#DCE2E9] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group"
              >
                {/* Image */}
                <div className="lg:col-span-5 relative aspect-[16/11] lg:aspect-auto">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#20262D]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {room.category}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white text-xs font-medium bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg">
                    {room.view}
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#C90028] uppercase tracking-wider mb-1">
                      {room.hotelName}
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#20262D] group-hover:text-[#C90028] transition-colors mb-2">
                      <Link to={`/rooms/${room.id}`}>
                        {room.name}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-500 mb-4 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Specs Row */}
                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#F2F5F9] my-4 text-xs">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Maximize2 className="w-4 h-4 text-[#C90028]" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Bed className="w-4 h-4 text-[#C90028]" />
                        <span>{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 text-[#C90028]" />
                        <span>{room.maxOccupancy.adults} Adults, {room.maxOccupancy.children} Children</span>
                      </div>
                    </div>

                    {/* Key features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities.slice(0, 4).map((a, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-[#F2F5F9] px-2.5 py-1 rounded-md">
                          <Check className="w-3 h-3 text-[#C90028]" />
                          <span>{a}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Booking Actions */}
                  <div className="pt-4 border-t border-[#F2F5F9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-gray-400 block uppercase font-semibold">Price per night</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C90028]">
                          {formatCurrency(room.pricePerNight)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {formatCurrency(room.originalPrice)}
                        </span>
                        <span className="text-xs text-gray-500">+ 12% GST</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Link
                        to={`/rooms/${room.id}`}
                        className="px-4 py-2.5 rounded-xl border border-gray-300 hover:border-black text-xs font-bold text-gray-800 transition-colors flex items-center justify-center gap-1 flex-1 sm:flex-none"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Explore</span>
                      </Link>
                      <button
                        onClick={() => handleBookNow(room)}
                        className="bg-[#C90028] hover:bg-[#A50020] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex-1 sm:flex-none cursor-pointer"
                      >
                        Reserve Suite
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default Rooms;

