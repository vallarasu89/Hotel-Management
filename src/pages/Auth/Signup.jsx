import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { User, Mail, Lock, Phone, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import mgmLogo from '../../assets/mgm-logo.png';

export const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    navigate('/account');
  };

  return (
    <>
      <Helmet>
        <title>Join MGM Privilege Club | MGM Hotels & Resorts</title>
      </Helmet>

      <div className="min-h-[85vh] bg-[#F2F5F9] py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#DCE2E9] shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block hover:scale-105 transition-transform" title="Back to Home">
              <img
                src={mgmLogo}
                alt="MGM - M.G. Muthu Group"
                className="h-12 w-auto object-contain mx-auto"
              />
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#20262D]">
              Join MGM Privilege
            </h1>
            <p className="text-xs text-gray-500">
              Receive 1,000 bonus welcome points and member-only tariffs instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Vallarasu"
                  className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#C90028]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Kumar"
                  className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#C90028]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
                className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C90028]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
                className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C90028]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C90028]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Member Account</span>
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#C90028] font-bold hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signup;

