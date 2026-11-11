import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import mgmLogo from '../../assets/mgm-logo.png';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/account');
  };

  return (
    <>
      <Helmet>
        <title>Member Sign In | MGM Privilege Club</title>
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
              MGM Privilege Sign In
            </h1>
            <p className="text-xs text-gray-500">
              Access your bookings, loyalty points, and member tariffs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#C90028]"
                  placeholder="name@example.com"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Password</label>
                <button
                  type="button"
                  onClick={() => toast.info('Password reset instructions have been sent if this email is registered.')}
                  className="text-[11px] text-[#C90028] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#C90028]"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Account</span>
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
            Don't have an MGM Privilege account?{' '}
            <Link to="/signup" className="text-[#C90028] font-bold hover:underline">
              Create an Account
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;

