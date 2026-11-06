import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  User, 
  Award, 
  Calendar, 
  Heart, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  Phone,
  Save
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ProfileSkeleton } from '../../components/skeletons';
import useAsyncData from '../../hooks/useAsyncData';

export const Account = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const { loading } = useAsyncData(user, 400);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <>
      <Helmet>
        <title>My MGM Privilege Account | MGM Hotels & Resorts</title>
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#DCE2E9] gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-[#20262D]">
                My Account & Privileges
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage your profile, preferences and loyalty benefits.
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-300 hover:border-red-500 text-xs font-bold text-gray-700 hover:text-red-600 transition-colors self-start cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 bg-white p-5 rounded-2xl border border-[#DCE2E9] shadow-sm space-y-1">
              <Link
                to="/account"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#C90028] text-white text-xs font-bold uppercase tracking-wider"
              >
                <User className="w-4 h-4" />
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
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Heart className="w-4 h-4 text-[#C90028]" />
                <span>Saved Wishlist</span>
              </Link>
            </aside>

            {/* Main Profile & Loyalty Status */}
            <main className="lg:col-span-9 space-y-8">
              
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <>
                  {/* Loyalty Banner Card */}
                  <div className="bg-[#20262D] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C90028]/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                      <div className="flex items-center gap-5">
                        <img
                          src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                          alt={user?.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#C90028] shadow-md"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="font-serif text-2xl font-bold text-white">{user?.name}</h2>
                            <span className="bg-[#C90028] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                              {user?.tier}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 mt-1">{user?.email}</p>
                          <div className="text-[11px] text-gray-400 mt-1">
                            Valued Member since {user?.memberSince}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 text-center sm:text-right min-w-[140px]">
                        <span className="text-[10px] text-gray-300 uppercase font-bold block">Reward Points</span>
                        <div className="font-serif text-3xl font-extrabold text-amber-300 mt-0.5">
                          {user?.points?.toLocaleString('en-IN') || '14,850'}
                        </div>
                        <span className="text-[10px] text-gray-400">Pts redeemable for free nights</span>
                      </div>
                    </div>
                  </div>

                  {savedNotice && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl">
                      Profile information updated successfully!
                    </div>
                  )}

                  {/* Profile Information Form */}
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                      <h3 className="font-serif text-xl font-bold text-[#20262D]">
                        Personal Profile Details
                      </h3>
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="text-xs font-bold text-[#C90028] uppercase hover:underline cursor-pointer"
                        >
                          Edit Profile
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="text-xs font-bold text-gray-500 uppercase hover:underline cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1">First Name</label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={`w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none ${
                            isEditing ? 'bg-[#F2F5F9] border border-gray-300 focus:border-[#C90028]' : 'bg-gray-50 border border-transparent'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1">Last Name</label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={`w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none ${
                            isEditing ? 'bg-[#F2F5F9] border border-gray-300 focus:border-[#C90028]' : 'bg-gray-50 border border-transparent'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1">Email Address</label>
                        <input
                          type="email"
                          disabled={!isEditing}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none ${
                            isEditing ? 'bg-[#F2F5F9] border border-gray-300 focus:border-[#C90028]' : 'bg-gray-50 border border-transparent'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-600 block mb-1">Phone Number</label>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none ${
                            isEditing ? 'bg-[#F2F5F9] border border-gray-300 focus:border-[#C90028]' : 'bg-gray-50 border border-transparent'
                          }`}
                        />
                      </div>

                      {isEditing && (
                        <div className="sm:col-span-2 pt-2">
                          <button
                            type="submit"
                            className="bg-[#C90028] hover:bg-[#A50020] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Profile Changes</span>
                          </button>
                        </div>
                      )}
                    </form>
                  </div>

                  {/* Stay Preferences */}
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2E9] shadow-sm space-y-4">
                    <h3 className="font-serif text-xl font-bold text-[#20262D]">
                      Stay & Room Preferences
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div className="p-3 bg-[#F2F5F9] rounded-xl">
                        <span className="text-gray-400 uppercase font-bold block text-[10px]">Room View</span>
                        <span className="font-bold text-gray-800">Sea Facing Cottage</span>
                      </div>
                      <div className="p-3 bg-[#F2F5F9] rounded-xl">
                        <span className="text-gray-400 uppercase font-bold block text-[10px]">Smoking</span>
                        <span className="font-bold text-gray-800">Non-Smoking</span>
                      </div>
                      <div className="p-3 bg-[#F2F5F9] rounded-xl">
                        <span className="text-gray-400 uppercase font-bold block text-[10px]">Morning Newspaper</span>
                        <span className="font-bold text-gray-800">The Hindu</span>
                      </div>
                      <div className="p-3 bg-[#F2F5F9] rounded-xl">
                        <span className="text-gray-400 uppercase font-bold block text-[10px]">Pillows</span>
                        <span className="font-bold text-gray-800">Goose Down Feather</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </main>

          </div>

        </div>
      </div>
    </>
  );
};

export default Account;

