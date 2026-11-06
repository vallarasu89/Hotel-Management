import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Maximize2, 
  Bed, 
  Users, 
  Eye, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Utensils, 
  Coffee,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { roomsData } from '../../data/rooms';
import { hotelsData } from '../../data/hotels';
import { formatCurrency } from '../../utils/formatters';
import { useBooking } from '../../context/BookingContext';
import useAsyncData from '../../hooks/useAsyncData';

export const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBooking, setCurrentBooking, searchParams } = useBooking();

  const room = roomsData.find(r => r.id === id) || roomsData[0];
  const hotel = hotelsData.find(h => h.id === room.hotelId) || hotelsData[0];

  const { loading } = useAsyncData(room, 500);

  const [activeImage, setActiveImage] = useState(room.image);
  const [selectedMealPlan, setSelectedMealPlan] = useState(room.mealPlans[0]);
  const [extraBed, setExtraBed] = useState(false);

  const handleProceedToCheckout = () => {
    setCurrentBooking(prev => ({
      ...prev,
      hotel,
      room,
      mealPlan: selectedMealPlan,
      extraBed
    }));
    navigate(`/checkout?hotelId=${hotel.id}&roomId=${room.id}`);
  };

  return (
    <>
      <Helmet>
        <title>{room.name} | {room.hotelName} | MGM Hotels</title>
        <meta name="description" content={room.description} />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-[#DCE2E9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
              <Link to="/" className="hover:text-[#C90028]">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Link to="/rooms" className="hover:text-[#C90028]">Rooms & Suites</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-[#20262D] font-bold">{room.name}</span>
            </nav>
          </div>
        </div>

        {/* Room Header Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#C90028] uppercase tracking-wider mb-1">
                {room.hotelName}
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#20262D] mb-2">
                {room.name}
              </h1>
              <p className="text-sm text-gray-600">{room.tagline}</p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs text-gray-400 uppercase font-semibold">Standard Tariff</span>
              <div className="font-serif text-3xl font-black text-[#C90028]">
                {formatCurrency(room.pricePerNight)}
                <span className="text-xs text-gray-500 font-normal"> / night</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="rounded-2xl overflow-hidden shadow-lg h-[350px] sm:h-[480px]">
            <img
              src={activeImage}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview & Dimensions */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#20262D]">
                Room Overview & Architectural Features
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {room.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100">
                <div className="p-3 bg-[#F2F5F9] rounded-xl text-center">
                  <Maximize2 className="w-5 h-5 text-[#C90028] mx-auto mb-1" />
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Area</div>
                  <div className="text-xs font-bold text-[#20262D]">{room.size}</div>
                </div>
                <div className="p-3 bg-[#F2F5F9] rounded-xl text-center">
                  <Bed className="w-5 h-5 text-[#C90028] mx-auto mb-1" />
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Bed Setup</div>
                  <div className="text-xs font-bold text-[#20262D]">{room.bedType}</div>
                </div>
                <div className="p-3 bg-[#F2F5F9] rounded-xl text-center">
                  <Users className="w-5 h-5 text-[#C90028] mx-auto mb-1" />
                  <div className="text-[10px] text-gray-500 uppercase font-bold">Occupancy</div>
                  <div className="text-xs font-bold text-[#20262D]">{room.maxOccupancy.adults} Adults, {room.maxOccupancy.children} Child</div>
                </div>
                <div className="p-3 bg-[#F2F5F9] rounded-xl text-center">
                  <Eye className="w-5 h-5 text-[#C90028] mx-auto mb-1" />
                  <div className="text-[10px] text-gray-500 uppercase font-bold">View</div>
                  <div className="text-xs font-bold text-[#20262D]">{room.view}</div>
                </div>
              </div>
            </div>

            {/* Room Amenities */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#20262D]">
                Room Amenities & Privileges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {room.amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-[#C90028] shrink-0" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meal Plans Selection */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#20262D]">
                Select Your Meal Plan
              </h2>
              <div className="space-y-3 pt-2">
                {room.mealPlans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex items-start justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedMealPlan.id === plan.id
                        ? 'border-[#C90028] bg-red-50/20'
                        : 'border-[#DCE2E9] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="mealPlan"
                        checked={selectedMealPlan.id === plan.id}
                        onChange={() => setSelectedMealPlan(plan)}
                        className="accent-[#C90028] mt-1"
                      />
                      <div>
                        <div className="font-bold text-sm text-[#20262D]">{plan.name}</div>
                        <div className="text-xs text-gray-500">{plan.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm text-[#C90028]">
                        {plan.priceAddition === 0 ? 'Included' : `+ ${formatCurrency(plan.priceAddition)} / guest`}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Extra Bed Option */}
            <div className="bg-white rounded-2xl p-6 border border-[#DCE2E9] shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#20262D]">Extra Rollaway Bed Needed?</h3>
                <p className="text-xs text-gray-500">Includes complete linen, duvet and pillow set</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#C90028]">+{formatCurrency(room.extraBedPrice)} / night</span>
                <input
                  type="checkbox"
                  checked={extraBed}
                  onChange={(e) => setExtraBed(e.target.checked)}
                  className="w-5 h-5 accent-[#C90028] cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* Sticky Reservation Summary Box */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE2E9] shadow-xl space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#20262D]">
                Reservation Summary
              </h3>

              <div className="space-y-2.5 text-xs text-gray-600 pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <span>Room Tariff</span>
                  <span className="font-bold text-gray-900">{formatCurrency(room.pricePerNight)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Meal Plan</span>
                  <span className="font-bold text-gray-900">
                    {selectedMealPlan.priceAddition === 0 ? 'Included' : formatCurrency(selectedMealPlan.priceAddition)}
                  </span>
                </div>
                {extraBed && (
                  <div className="flex justify-between text-gray-900">
                    <span>Extra Bed</span>
                    <span className="font-bold">{formatCurrency(room.extraBedPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Taxes (12% GST)</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs uppercase font-bold text-gray-500">Estimated Total</span>
                <span className="font-serif text-2xl font-black text-[#C90028]">
                  {formatCurrency(room.pricePerNight + selectedMealPlan.priceAddition + (extraBed ? room.extraBedPrice : 0))}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-[11px] text-gray-400 text-center space-y-1">
                <div>✓ Instant confirmation via email</div>
                <div>✓ Zero reservation or credit card fees</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default RoomDetails;

