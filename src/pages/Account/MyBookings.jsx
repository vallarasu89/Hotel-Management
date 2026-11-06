import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  MapPin, 
  FileText, 
  AlertCircle, 
  Printer, 
  X, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  User,
  Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/formatters';
import { TableSkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';
import mgmLogo from '../../assets/mgm-logo.png';

export const MyBookings = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { bookingsList, cancelBooking } = useBooking();
  const { loading } = useAsyncData(bookingsList, 400);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [activeTab, setActiveTab] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredBookings = bookingsList.filter(b => {
    if (activeTab === 'All') return true;
    return b.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <>
      <Helmet>
        <title>My Reservations | MGM Hotels & Resorts</title>
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#DCE2E9] gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-[#20262D]">
                My Stay Reservations
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                View upcoming, completed and past itineraries.
              </p>
            </div>

            <Link
              to="/booking"
              className="bg-[#C90028] hover:bg-[#A50020] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors self-start"
            >
              Book a New Stay
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 bg-white p-5 rounded-2xl border border-[#DCE2E9] shadow-sm space-y-1">
              <Link
                to="/account"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <User className="w-4 h-4 text-[#C90028]" />
                <span>Profile & Status</span>
              </Link>
              <Link
                to="/account/bookings"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#C90028] text-white text-xs font-bold uppercase tracking-wider"
              >
                <Calendar className="w-4 h-4" />
                <span>My Bookings</span>
              </Link>
              <Link
                to="/account/wishlist"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Heart className="w-4 h-4 text-[#C90028]" />
                <span>Saved Wishlist</span>
              </Link>
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-9 space-y-6">
              
              {/* Tab Filters */}
              <div className="flex gap-2">
                {['All', 'Confirmed', 'Completed', 'Cancelled'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                      activeTab === tab
                        ? 'bg-[#20262D] text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#DCE2E9]'
                    }`}
                  >
                    {tab} ({bookingsList.filter(b => tab === 'All' ? true : b.status.toLowerCase() === tab.toLowerCase()).length})
                  </button>
                ))}
              </div>

              {loading ? (
                <TableSkeleton rows={3} cols={4} />
              ) : filteredBookings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#DCE2E9] space-y-4">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-[#20262D]">No Bookings Found in {activeTab}</h3>
                  <p className="text-xs text-gray-500">Plan your next luxury escape with MGM Hotels & Resorts.</p>
                  <Link
                    to="/hotels"
                    className="inline-block bg-[#C90028] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase"
                  >
                    Explore Destinations
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl p-6 border border-[#DCE2E9] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={b.image || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=80"}
                          alt={b.hotelName}
                          className="w-20 h-20 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-gray-400">{b.id}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              b.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {b.status}
                            </span>
                          </div>

                          <h3 className="font-serif text-lg font-bold text-[#20262D]">{b.hotelName}</h3>
                          <p className="text-xs text-[#C90028] font-bold">{b.roomName}</p>

                          <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                            <span>Check-in: <strong>{b.checkIn}</strong></span>
                            <span>Check-out: <strong>{b.checkOut}</strong></span>
                            <span>{b.nights} Night(s)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end justify-between gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold block md:text-right">Total Paid</span>
                          <span className="font-serif text-xl font-bold text-[#20262D] md:text-right block">
                            {formatCurrency(b.totalAmount)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoice(b)}
                            className="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-black text-xs font-semibold text-gray-700 flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#C90028]" />
                            <span>Invoice</span>
                          </button>

                          {b.status === 'Confirmed' && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to cancel booking ${b.id}?`)) {
                                  cancelBooking(b.id);
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                            >
                              Cancel Stay
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </main>

          </div>

          {/* Printable Invoice Modal Simulator */}
          {selectedInvoice && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={mgmLogo}
                      alt="MGM - M.G. Muthu Group"
                      className="h-10 w-auto object-contain"
                    />
                    <div className="border-l border-gray-200 pl-3">
                      <h3 className="font-serif text-lg font-bold text-[#20262D]">MGM HOTELS & RESORTS</h3>
                      <p className="text-[11px] text-gray-500">Official Tax Invoice / Folio Receipt</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="p-1 rounded-full text-gray-400 hover:text-black cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[10px] block">Invoice To:</span>
                    <div className="font-bold text-[#20262D]">Vallarasu Kumar</div>
                    <div className="text-gray-500">vallarasu@example.com</div>
                    <div className="text-gray-500">Privilege Gold Member #78901</div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 font-bold uppercase text-[10px] block">Invoice # / Date:</span>
                    <div className="font-mono font-bold text-[#20262D]">{selectedInvoice.id}</div>
                    <div className="text-gray-500">Issue Date: {selectedInvoice.createdAt || '2026-02-15'}</div>
                    <div className="text-emerald-600 font-bold">Status: {selectedInvoice.paymentStatus || 'Paid Online'}</div>
                  </div>
                </div>

                {/* Folio Items */}
                <div className="bg-[#F2F5F9] rounded-2xl p-4 text-xs space-y-2">
                  <div className="font-bold text-[#20262D] pb-1 border-b border-gray-200 flex justify-between">
                    <span>Description</span>
                    <span>Amount (INR)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{selectedInvoice.hotelName} — {selectedInvoice.roomName} ({selectedInvoice.nights} Nights)</span>
                    <span>{formatCurrency(selectedInvoice.totalAmount * 0.88)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>GST & Luxury Hospitality Tax (12%)</span>
                    <span>{formatCurrency(selectedInvoice.totalAmount * 0.12)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#C90028] pt-2 border-t border-gray-200">
                    <span>Total Amount Paid</span>
                    <span>{formatCurrency(selectedInvoice.totalAmount)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-[11px] text-gray-400">GSTIN: 33AAACM0921P1Z8 • Authorized Folio</div>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-[#20262D] text-white rounded-xl text-xs font-bold uppercase flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#C90028]" />
                    <span>Print Invoice</span>
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default MyBookings;

