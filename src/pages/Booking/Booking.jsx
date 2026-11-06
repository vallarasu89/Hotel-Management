import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { hotelsData, destinationsList } from '../../data/hotels';
import { roomsData } from '../../data/rooms';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/formatters';

export const Booking = () => {
  const navigate = useNavigate();
  const [searchParamsUrl] = useSearchParams();
  const { searchParams, setSearchParams, setCurrentBooking } = useBooking();

  const urlHotelId = searchParamsUrl.get('hotelId');
  const [selectedHotelId, setSelectedHotelId] = useState(urlHotelId || hotelsData[0].id);

  const selectedHotel = hotelsData.find(h => h.id === selectedHotelId) || hotelsData[0];
  const hotelRooms = roomsData.filter(r => r.hotelId === selectedHotel.id || selectedHotel.roomTypes.includes(r.id));

  const [selectedRoom, setSelectedRoom] = useState(hotelRooms[0] || roomsData[0]);

  const handleProceed = () => {
    setCurrentBooking(prev => ({
      ...prev,
      hotel: selectedHotel,
      room: selectedRoom
    }));
    navigate(`/checkout?hotelId=${selectedHotel.id}&roomId=${selectedRoom.id}`);
  };

  return (
    <>
      <Helmet>
        <title>Reserve Your Stay | MGM Hotels & Resorts Official Direct Booking</title>
        <meta name="description" content="Book direct with MGM Hotels & Resorts for best rate guarantee, complimentary breakfast, and flexible cancellation." />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Page Banner */}
        <div className="bg-[#15191E] text-white py-12 sm:py-16 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C90028] bg-[#C90028]/10 px-3 py-1 rounded-full border border-[#C90028]/30">
              Official Direct Reservation
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-3 mb-2">
              Select Your Preferred Stay Experience
            </h1>
            <p className="text-gray-300 text-sm max-w-xl mx-auto">
              Guaranteed lowest rates with instant confirmation and 0% reservation fees.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          
          {/* Quick Dates & Guests Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#DCE2E9] mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Selected Hotel
              </label>
              <select
                value={selectedHotelId}
                onChange={(e) => {
                  setSelectedHotelId(e.target.value);
                  const h = hotelsData.find(x => x.id === e.target.value);
                  const r = roomsData.find(rm => rm.hotelId === h.id || h.roomTypes.includes(rm.id));
                  if (r) setSelectedRoom(r);
                }}
                className="w-full bg-[#F2F5F9] font-bold text-sm text-[#20262D] rounded-xl px-3 py-2.5 outline-none cursor-pointer"
              >
                {hotelsData.map(h => (
                  <option key={h.id} value={h.id}>{h.name} ({h.city})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Check-In Date
              </label>
              <input
                type="date"
                value={searchParams.checkIn}
                onChange={(e) => setSearchParams(prev => ({ ...prev, checkIn: e.target.value }))}
                className="w-full bg-[#F2F5F9] font-bold text-sm text-[#20262D] rounded-xl px-3 py-2.5 outline-none cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Check-Out Date
              </label>
              <input
                type="date"
                value={searchParams.checkOut}
                onChange={(e) => setSearchParams(prev => ({ ...prev, checkOut: e.target.value }))}
                className="w-full bg-[#F2F5F9] font-bold text-sm text-[#20262D] rounded-xl px-3 py-2.5 outline-none cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Occupancy
              </label>
              <div className="bg-[#F2F5F9] font-bold text-xs sm:text-sm text-[#20262D] rounded-xl px-3 py-3">
                {searchParams.adults} Adults • {searchParams.rooms} Room
              </div>
            </div>

          </div>

          {/* Room Selection Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#20262D] flex items-center justify-between">
                <span>Select Room Category at {selectedHotel.name}</span>
                <span className="text-xs font-sans text-gray-500 font-normal">
                  {hotelRooms.length} categories available
                </span>
              </h2>

              <div className="space-y-4">
                {hotelRooms.map((room) => {
                  const isSelected = selectedRoom.id === room.id;

                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-6 rounded-2xl bg-white border-2 cursor-pointer transition-all shadow-sm hover:shadow-md grid grid-cols-1 sm:grid-cols-12 gap-6 items-center ${
                        isSelected ? 'border-[#C90028] ring-2 ring-[#C90028]/20' : 'border-[#DCE2E9]'
                      }`}
                    >
                      <div className="sm:col-span-4 aspect-[16/11] rounded-xl overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="sm:col-span-8 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-serif text-xl font-bold text-[#20262D]">
                              {room.name}
                            </h3>
                            {isSelected && (
                              <span className="bg-[#C90028] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-3">{room.tagline}</p>
                          <div className="flex gap-3 text-xs text-gray-600 mb-3">
                            <span>{room.size}</span>
                            <span>•</span>
                            <span>{room.bedType}</span>
                            <span>•</span>
                            <span>{room.view}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase font-semibold">Tariff per night</span>
                            <div className="font-serif text-xl font-bold text-[#C90028]">
                              {formatCurrency(room.pricePerNight)}
                            </div>
                          </div>

                          <button
                            type="button"
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                              isSelected
                                ? 'bg-[#C90028] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Choose Room'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sticky Selection Summary */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-2xl p-6 border border-[#DCE2E9] shadow-xl space-y-5">
                <h3 className="font-serif text-xl font-bold text-[#20262D] pb-3 border-b border-gray-100">
                  Stay Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-gray-400 block font-semibold uppercase text-[10px]">Destination</span>
                    <span className="font-bold text-[#20262D] text-sm">{selectedHotel.name}</span>
                    <span className="text-gray-500 block">{selectedHotel.city}, {selectedHotel.state}</span>
                  </div>

                  <div>
                    <span className="text-gray-400 block font-semibold uppercase text-[10px]">Selected Room</span>
                    <span className="font-bold text-[#20262D] text-sm">{selectedRoom.name}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex justify-between">
                    <span className="text-gray-500">Dates</span>
                    <span className="font-bold text-gray-800">{searchParams.checkIn} to {searchParams.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Base Nightly Rate</span>
                    <span className="font-bold text-[#C90028]">{formatCurrency(selectedRoom.pricePerNight)}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceed}
                  className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1.5 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Zero booking fee • Free cancellation</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Booking;

