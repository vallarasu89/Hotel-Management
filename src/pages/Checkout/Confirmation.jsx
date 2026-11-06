import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/formatters';
import mgmLogo from '../../assets/mgm-logo.png';

export const Confirmation = () => {
  const [params] = useSearchParams();
  const { bookingsList } = useBooking();

  const bookingId = params.get('bookingId') || (bookingsList[0]?.id || 'MGM-BK-9182');
  const booking = bookingsList.find(b => b.id === bookingId) || bookingsList[0];

  useEffect(() => {
    // Confetti celebration burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Booking Confirmed | MGM Hotels & Resorts</title>
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Banner */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DCE2E9] shadow-xl text-center space-y-6 mb-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                Reservation Confirmed & Guaranteed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#20262D] mt-3">
                We Look Forward to Welcoming You
              </h1>
              <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                A confirmation voucher and detailed arrival instructions have been dispatched to your email address.
              </p>
            </div>

            {/* Booking Reference Pill */}
            <div className="inline-block bg-[#F2F5F9] border border-[#DCE2E9] rounded-2xl px-6 py-3">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold block">Confirmation Code</span>
              <span className="font-mono text-2xl font-black text-[#C90028] tracking-widest">{bookingId}</span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-white border border-gray-300 hover:border-black text-xs font-bold text-gray-700 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4 text-[#C90028]" />
                <span>Print Itinerary Voucher</span>
              </button>

              <Link
                to="/account/bookings"
                className="px-5 py-2 rounded-xl bg-[#20262D] hover:bg-black text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors"
              >
                <span>View in My Bookings</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C90028]" />
              </Link>
            </div>
          </div>

          {/* Detailed Printable Itinerary Card */}
          <div className="bg-white rounded-3xl p-8 border border-[#DCE2E9] shadow-sm space-y-6">
            <div className="flex justify-between items-start pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <img src={mgmLogo} alt="MGM - M.G. Muthu Group" className="h-11 w-auto object-contain hidden sm:block" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Property</span>
                  <h3 className="font-serif text-2xl font-bold text-[#20262D]">{booking?.hotelName}</h3>
                  <p className="text-xs text-[#C90028] font-bold mt-0.5">{booking?.roomName}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Total Tariff</span>
                <div className="font-serif text-2xl font-bold text-[#20262D]">
                  {formatCurrency(booking?.totalAmount)}
                </div>
                <span className="text-[11px] text-emerald-600 font-bold block">
                  ✓ {booking?.paymentStatus}
                </span>
              </div>
            </div>

            {/* Stay Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-2">
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Check-In</span>
                <div className="font-bold text-sm text-[#20262D]">{booking?.checkIn}</div>
                <div className="text-xs text-gray-500">From 14:00 (2:00 PM)</div>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Check-Out</span>
                <div className="font-bold text-sm text-[#20262D]">{booking?.checkOut}</div>
                <div className="text-xs text-gray-500">Until 12:00 (Noon)</div>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-bold uppercase block mb-1">Guests & Stay</span>
                <div className="font-bold text-sm text-[#20262D]">{booking?.guests}</div>
                <div className="text-xs text-gray-500">{booking?.nights} Night(s) Stay</div>
              </div>
            </div>

            {/* Hotel Help & Concierge Support */}
            <div className="p-4 bg-[#F2F5F9] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C90028]" />
                <div>
                  <div className="font-bold text-[#20262D]">Need to modify your stay or request early arrival?</div>
                  <div className="text-gray-500">Reach our 24/7 Concierge at +91 44 2747 2435</div>
                </div>
              </div>

              <Link
                to="/"
                className="text-[#C90028] font-bold uppercase tracking-wider hover:underline"
              >
                Back to Homepage →
              </Link>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Confirmation;

