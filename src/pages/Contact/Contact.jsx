import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { hotelsData } from '../../data/hotels';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: 'MGM Beach Resorts, Chennai',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        property: 'MGM Beach Resorts, Chennai',
        message: ''
      });
    }, 4000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us & Concierge Desk | MGM Hotels & Resorts</title>
        <meta name="description" content="Reach our 24/7 reservations desk, wedding planning team, and concierge across all MGM properties in India." />
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen pb-20">
        
        {/* Hero Header */}
        <div className="bg-[#15191E] text-white py-16 sm:py-20 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C90028]/20 border border-[#C90028]/30 text-white text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-[#C90028]" />
              At Your Service 24/7
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Connect With MGM Concierge
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
              Our reservation team and dedicated resort concierges are available around the clock to tailor your upcoming stay.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#DCE2E9] shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#20262D] mb-2">
                Send an Inquiry or Special Request
              </h2>
              <p className="text-xs text-gray-500 mb-6">
                Fill in the details below and our team will get in touch within 2 business hours.
              </p>

              {submitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-xl font-bold">Message Dispatched Successfully!</h3>
                  <p className="text-xs text-emerald-700">Thank you for reaching out. Our concierge will call or email you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Vallarasu Kumar"
                        className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C90028]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C90028]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C90028]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Destination of Interest</label>
                      <select
                        value={formData.property}
                        onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                        className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 outline-none focus:border-[#C90028]"
                      >
                        {hotelsData.map(h => (
                          <option key={h.id} value={h.name}>{h.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Message or Requirement *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your travel dates, room preferences, banquet requirements, or custom dietary requests..."
                      className="w-full bg-[#F2F5F9] border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#C90028]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C90028] hover:bg-[#A50020] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>

            {/* Corporate & Central Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#20262D] text-white rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C90028] block mb-1">Central Reservations</span>
                  <h3 className="font-serif text-2xl font-bold text-white">MGM Hospitality Headquarters</h3>
                </div>

                <div className="space-y-4 text-xs text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C90028] shrink-0 mt-0.5" />
                    <span>1/74 East Coast Road, Muttukadu, Chennai 603112, Tamil Nadu, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#C90028] shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">+91 44 2747 2435</div>
                      <div className="text-gray-400">Available 24 Hours / 7 Days</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#C90028] shrink-0" />
                    <div>
                      <div className="font-bold text-white text-sm">reservations@mgm-hotels.com</div>
                      <div className="text-gray-400">Response within 2 hours</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-gray-400 space-y-1">
                  <div><strong>Weddings & MICE Banqueting:</strong> events@mgm-hotels.com</div>
                  <div><strong>Travel Trade & Corporate:</strong> sales@mgm-hotels.com</div>
                </div>
              </div>
            </div>

          </div>

          {/* Directory of all Properties */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#20262D]">
              Direct Contact Directory by Property
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotelsData.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-2xl p-6 border border-[#DCE2E9] shadow-sm space-y-3">
                  <h3 className="font-serif text-lg font-bold text-[#20262D]">{hotel.name}</h3>
                  <div className="text-xs text-gray-500 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#C90028] shrink-0 mt-0.5" />
                    <span>{hotel.address}</span>
                  </div>
                  <div className="text-xs text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C90028] shrink-0" />
                    <span className="font-bold">{hotel.phone}</span>
                  </div>
                  <div className="text-xs text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#C90028] shrink-0" />
                    <span>{hotel.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Contact;

