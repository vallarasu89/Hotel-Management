import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Maximize2, Users, Bed, Eye, ArrowRight, Check } from 'lucide-react';
import { roomsData } from '../../../data/rooms';
import { hotelsData } from '../../../data/hotels';
import { formatCurrency } from '../../../utils/formatters';
import { RoomCardSkeleton } from '../../../components/skeletons';
import { useBooking } from '../../../context/BookingContext';
import { useToast } from '../../../context/ToastContext';

export const RoomsSuitesSection = ({ loading = false }) => {
  const navigate = useNavigate();
  const { setCurrentBooking } = useBooking();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('all');

  const filteredRooms = activeTab === 'all'
    ? roomsData.slice(0, 3)
    : roomsData.filter(r => r.type.toLowerCase() === activeTab.toLowerCase());

  const handleReserveRoom = (room) => {
    const hotel = hotelsData.find(h => h.id === room.hotelId) || hotelsData[0];
    setCurrentBooking(prev => ({
      ...prev,
      hotel,
      room
    }));
    toast.info(`Selected ${room.name} (${hotel.name}) for booking`);
    navigate(`/checkout?hotelId=${room.hotelId}&roomId=${room.id}`);
  };

  return (
    <section className="py-20 bg-[#F2F5F9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C90028]/10 text-[#C90028] text-xs font-bold uppercase tracking-wider mb-3">
              Accommodation Portfolio
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#20262D]">
              Exquisite Rooms, Cottages & Suites
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
              Each space is thoughtfully crafted with handcrafted woodwork, coastal verandas, and bespoke comfort.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'cottage', label: 'Cottages' },
              { id: 'suite', label: 'Luxury Suites' },
              { id: 'villa', label: 'Villas' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#20262D] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#DCE2E9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <RoomCardSkeleton key={i} />
            ))
          ) : (
            filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#DCE2E9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/11]">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#20262D]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    {room.category}
                  </div>
                  <div className="absolute bottom-3 left-4 text-white text-xs font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    {room.view}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#C90028] uppercase tracking-wider mb-1">
                      {room.hotelName}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#20262D] group-hover:text-[#C90028] transition-colors mb-2">
                      <Link to={`/rooms/${room.id}`}>
                        {room.name}
                      </Link>
                    </h3>

                    {/* Room Key Specs */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#F2F5F9] my-3 text-center text-xs text-gray-600">
                      <div className="flex flex-col items-center">
                        <Maximize2 className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="font-semibold text-gray-700">{room.size.split('/')[0]}</span>
                      </div>
                      <div className="flex flex-col items-center border-x border-[#F2F5F9]">
                        <Bed className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="font-semibold text-gray-700 truncate max-w-[80px]">{room.bedType.split(' ')[0]}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Users className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="font-semibold text-gray-700">{room.maxOccupancy.adults} Adults</span>
                      </div>
                    </div>

                    {/* Highlight amenities */}
                    <div className="space-y-1.5 my-3 text-xs text-gray-500">
                      {room.amenities.slice(0, 2).map((a, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C90028]" />
                          <span className="truncate">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="pt-4 border-t border-[#F2F5F9] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block uppercase font-semibold">
                        Tariff per night
                      </span>
                      <span className="font-serif text-xl font-bold text-[#C90028]">
                        {formatCurrency(room.pricePerNight)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/rooms/${room.id}`}
                        className="p-2 rounded-lg border border-[#DCE2E9] hover:border-[#20262D] text-gray-700 hover:text-black transition-colors"
                        title="View Room Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleReserveRoom(room)}
                        className="bg-[#C90028] hover:bg-[#A50020] text-white px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 cursor-pointer"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Rooms Button */}
        <div className="mt-12 text-center">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 bg-[#20262D] hover:bg-[#15191E] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg"
          >
            <span>Explore All Rooms & Suites</span>
            <ArrowRight className="w-4 h-4 text-[#C90028]" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default RoomsSuitesSection;
