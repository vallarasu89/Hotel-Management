import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, Trash2, Calendar, User, Eye, ArrowRight, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatters';
import { CardSkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';

export const Wishlist = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { loading } = useAsyncData(wishlist, 400);

  return (
    <>
      <Helmet>
        <title>My Saved Wishlist | MGM Hotels & Resorts</title>
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#DCE2E9] gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-[#20262D]">
                Saved Favorites & Wishlist
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Your shortlisted luxury escapes and signature suites.
              </p>
            </div>
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
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#C90028]" />
                <span>My Bookings</span>
              </Link>
              <Link
                to="/account/wishlist"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#C90028] text-white text-xs font-bold uppercase tracking-wider"
              >
                <Heart className="w-4 h-4" />
                <span>Saved Wishlist{isAuthenticated ? ` (${wishlist.length})` : ''}</span>
              </Link>
            </aside>

            {/* Wishlist Grid */}
            <main className="lg:col-span-9">
              {!isAuthenticated ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#DCE2E9] space-y-4 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-[#C90028]/10 text-[#C90028] flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#20262D]">
                    Sign In to Access Your Wishlist
                  </h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Your saved luxury properties and signature suites are safely synchronized with your MGM Privilege Club account. Sign in to view and reserve your dream vacations.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 bg-[#C90028] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#A50020] transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Member Sign In</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => login('vallarasu@example.com')}
                      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#20262D] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#C90028]" />
                      <span>Demo Login as Vallarasu</span>
                    </button>
                  </div>
                </div>
              ) : loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              ) : wishlist.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#DCE2E9] space-y-4">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-[#20262D]">Your Wishlist is Empty</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Explore our coastal resorts, palace hotels, and private suites to save your dream escapes.
                  </p>
                  <Link
                    to="/hotels"
                    className="inline-block bg-[#C90028] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    Explore Resorts
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#DCE2E9] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-red-500 flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="p-6">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                            {item.type === 'hotel' ? 'Luxury Property' : 'Signature Suite'}
                          </span>
                          <h3 className="font-serif text-lg font-bold text-[#20262D] mb-1">
                            {item.name}
                          </h3>
                          <div className="text-xs text-gray-500">
                            {item.city || item.hotelName}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-[#F2F5F9] flex items-center justify-between mt-auto">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-semibold block">From</span>
                          <span className="font-serif text-lg font-bold text-[#C90028]">
                            {formatCurrency(item.pricePerNight)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={item.type === 'hotel' ? `/hotels/${item.id}` : `/rooms/${item.id}`}
                            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:text-black"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => navigate(item.type === 'hotel' ? `/booking?hotelId=${item.id}` : `/checkout?roomId=${item.id}`)}
                            className="bg-[#C90028] hover:bg-[#A50020] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </main>

          </div>

        </div>
      </div>
    </>
  );
};

export default Wishlist;

