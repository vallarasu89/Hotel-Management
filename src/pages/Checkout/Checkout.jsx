import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  CreditCard, 
  QrCode, 
  Building2, 
  ShieldCheck, 
  Tag, 
  Check, 
  X, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency, calculateNights } from '../../utils/formatters';
import { CheckoutSkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';

export const Checkout = () => {
  const navigate = useNavigate();
  const { 
    searchParams, 
    currentBooking, 
    setCurrentBooking, 
    calculateBookingTotal,
    applyCouponCode,
    removeCouponCode,
    addConfirmedBooking 
  } = useBooking();

  const { loading } = useAsyncData(true, 400);

  const hotel = currentBooking.hotel || {
    id: 'mgm-beach-resort',
    name: 'MGM Beach Resorts, Chennai',
    city: 'Chennai',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80'
  };

  const room = currentBooking.room || {
    id: 'deluxe-cottage',
    name: 'Deluxe Garden Cottage',
    pricePerNight: 7500,
    extraBedPrice: 1500
  };

  const [guestForm, setGuestForm] = useState({
    title: 'Mr',
    firstName: currentBooking.guestInfo?.firstName || 'Vallarasu',
    lastName: currentBooking.guestInfo?.lastName || 'Kumar',
    email: currentBooking.guestInfo?.email || 'vallarasu@example.com',
    phone: currentBooking.guestInfo?.phone || '+91 98765 43210',
    specialRequests: currentBooking.specialRequests || ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const priceDetails = calculateBookingTotal(room, {
    mealPlan: currentBooking.mealPlan,
    extraBed: currentBooking.extraBed,
    appliedCoupon: currentBooking.appliedCoupon
  });

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    setCouponMsg(res);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setGuestForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const confirmedBooking = addConfirmedBooking({
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomName: room.name,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        nights: priceDetails.nights,
        guests: `${searchParams.adults} Adults, ${searchParams.children} Children`,
        rooms: searchParams.rooms,
        totalAmount: priceDetails.grandTotal,
        paymentStatus: paymentMethod === 'pay_later' ? 'Pay at Hotel' : 'Paid Online (Simulated)',
        guestInfo: guestForm,
        image: hotel.image
      });

      setIsProcessing(false);
      navigate(`/confirmation?bookingId=${confirmedBooking.id}`);
    }, 1200);
  };

  if (loading) {
    return <CheckoutSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>Secure Checkout | MGM Hotels & Resorts</title>
        <meta name="description" content="Complete your reservation securely with MGM Hotels & Resorts." />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#20262D]">
              Complete Your Reservation
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Step 2 of 2: Guest Information & Simulated Payment
            </p>
          </div>

          <form onSubmit={handleCompleteBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form & Payment */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Guest Details */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-6">
                <h2 className="font-serif text-xl font-bold text-[#20262D] pb-3 border-b border-gray-100">
                  Primary Guest Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-600 block mb-1">Title</label>
                    <select
                      name="title"
                      value={guestForm.title}
                      onChange={handleFormChange}
                      className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none focus:border-[#C90028]"
                    >
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Dr">Dr.</option>
                    </select>
                  </div>

                  <div className="sm:col-span-5">
                    <label className="text-xs font-bold text-gray-600 block mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={guestForm.firstName}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-[#C90028]"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label className="text-xs font-bold text-gray-600 block mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={guestForm.lastName}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-[#C90028]"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label className="text-xs font-bold text-gray-600 block mb-1">Email Address (for booking confirmation) *</label>
                    <input
                      type="email"
                      name="email"
                      value={guestForm.email}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-[#C90028]"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label className="text-xs font-bold text-gray-600 block mb-1">Phone Number (with country code) *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={guestForm.phone}
                      onChange={handleFormChange}
                      required
                      className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none focus:border-[#C90028]"
                    />
                  </div>

                  <div className="sm:col-span-12">
                    <label className="text-xs font-bold text-gray-600 block mb-1">Special Requests (Optional)</label>
                    <textarea
                      name="specialRequests"
                      rows={2}
                      value={guestForm.specialRequests}
                      onChange={handleFormChange}
                      placeholder="e.g. Quiet room away from elevator, feather-free pillows, late check-in notice..."
                      className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-[#C90028]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection (Frontend Simulated) */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-6">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#20262D]">
                    Payment Method
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Frontend simulation mode. No real payment or cards required.
                  </p>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI / QR Code', icon: QrCode },
                    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                    { id: 'pay_later', label: 'Pay at Hotel', icon: ShieldCheck }
                  ].map((method) => {
                    const IconComp = method.icon;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3.5 rounded-xl border-2 flex flex-col items-center text-center gap-2 transition-all cursor-pointer ${
                          paymentMethod === method.id
                            ? 'border-[#C90028] bg-red-50/20 text-[#20262D] font-bold'
                            : 'border-[#DCE2E9] text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <IconComp className={`w-5 h-5 ${paymentMethod === method.id ? 'text-[#C90028]' : 'text-gray-400'}`} />
                        <span className="text-xs">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Payment Sub-screens */}
                {paymentMethod === 'card' && (
                  <div className="bg-[#F2F5F9] p-5 rounded-xl space-y-3">
                    <div className="text-xs font-bold text-gray-700">Simulated Card Details</div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        defaultValue="4111 2222 3333 4444"
                        placeholder="Card Number"
                        className="col-span-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono"
                      />
                      <input
                        type="text"
                        defaultValue="12/28"
                        placeholder="MM/YY"
                        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono"
                      />
                      <input
                        type="password"
                        defaultValue="123"
                        placeholder="CVV"
                        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="bg-[#F2F5F9] p-5 rounded-xl text-center space-y-2">
                    <QrCode className="w-16 h-16 mx-auto text-gray-800" />
                    <p className="text-xs text-gray-600 font-medium">Scan QR code using GPay, PhonePe, or Paytm during simulation.</p>
                  </div>
                )}

                {paymentMethod === 'pay_later' && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800">
                    Pay securely in cash or card at the hotel front desk upon arrival. Free cancellation remains applicable up to 48 hours prior.
                  </div>
                )}
              </div>

              {/* Cancellation Policy Accordion */}
              <div className="bg-white rounded-2xl border border-[#DCE2E9] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setPolicyOpen(!policyOpen)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-gray-50"
                >
                  <span className="font-bold text-sm text-[#20262D]">Cancellation & Refund Policy</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${policyOpen ? 'rotate-180' : ''}`} />
                </button>
                {policyOpen && (
                  <div className="p-5 pt-0 text-xs text-gray-600 space-y-2 border-t border-gray-100">
                    <p>• <strong>Free Cancellation:</strong> Full 100% refund for cancellations initiated up to 48 hours before check-in (14:00 local time).</p>
                    <p>• <strong>Reschedule Guarantee:</strong> You can modify dates one time free of charge within 6 months of booking.</p>
                    <p>• <strong>Refund Processing:</strong> Refunds are credited back to the original method within 3 business days.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Sticky Summary & Price Breakdown */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE2E9] shadow-xl space-y-5">
                <h3 className="font-serif text-xl font-bold text-[#20262D] pb-3 border-b border-gray-100">
                  Booking Summary
                </h3>

                {/* Hotel & Room snippet */}
                <div className="flex gap-3">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#20262D] leading-tight">{hotel.name}</h4>
                    <p className="text-xs text-[#C90028] font-semibold mt-0.5">{room.name}</p>
                    <p className="text-[11px] text-gray-400">{hotel.city}</p>
                  </div>
                </div>

                {/* Itinerary info */}
                <div className="bg-[#F2F5F9] p-3 rounded-xl space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C90028]" />
                      Dates
                    </span>
                    <span className="font-bold text-gray-800">{priceDetails.nights} Night(s)</span>
                  </div>
                  <div className="text-[11px] text-gray-500 pl-4.5">
                    {searchParams.checkIn} to {searchParams.checkOut}
                  </div>
                  <div className="flex justify-between pt-1 border-t border-gray-200">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#C90028]" />
                      Guests & Rooms
                    </span>
                    <span className="font-bold text-gray-800">{searchParams.adults} Adults, {searchParams.rooms} Room</span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div className="pt-2">
                  {currentBooking.appliedCoupon ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-emerald-800 uppercase block">{currentBooking.appliedCoupon.code} Applied</span>
                        <span className="text-emerald-600 text-[11px]">{currentBooking.appliedCoupon.label}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCouponCode}
                        className="text-red-600 hover:text-red-800 font-bold"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Promo Code (MGMROYAL25)"
                          className="flex-1 bg-[#F2F5F9] border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono uppercase outline-none focus:border-[#C90028]"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="bg-[#20262D] hover:bg-black text-white px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponMsg && (
                        <p className={`text-[11px] ${couponMsg.success ? 'text-emerald-600' : 'text-red-500'}`}>
                          {couponMsg.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Base Room Tariff ({priceDetails.nights} nights)</span>
                    <span className="font-bold text-gray-900">{formatCurrency(priceDetails.base)}</span>
                  </div>
                  {priceDetails.mealAddition > 0 && (
                    <div className="flex justify-between">
                      <span>Meal Plan ({currentBooking.mealPlan?.name})</span>
                      <span className="font-bold text-gray-900">{formatCurrency(priceDetails.mealAddition)}</span>
                    </div>
                  )}
                  {priceDetails.extraBedPrice > 0 && (
                    <div className="flex justify-between">
                      <span>Extra Rollaway Bed</span>
                      <span className="font-bold text-gray-900">{formatCurrency(priceDetails.extraBedPrice)}</span>
                    </div>
                  )}
                  {priceDetails.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promotional Discount</span>
                      <span>- {formatCurrency(priceDetails.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Goods & Services Tax (GST 12%)</span>
                    <span className="font-bold text-gray-900">{formatCurrency(priceDetails.tax)}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-gray-200 text-sm">
                    <span className="font-bold text-[#20262D]">Total Payable Amount</span>
                    <span className="font-serif text-2xl font-black text-[#C90028]">
                      {formatCurrency(priceDetails.grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-4 rounded-xl uppercase tracking-wider text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="animate-pulse">Confirming Reservation...</span>
                  ) : (
                    <>
                      <span>Confirm & Reserve Stay</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-[11px] text-gray-400 text-center">
                  By clicking confirm, you agree to MGM Terms and Cancellation Guidelines.
                </div>

              </div>

            </div>

          </form>

        </div>
      </div>
    </>
  );
};

export default Checkout;

