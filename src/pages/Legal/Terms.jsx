import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck } from 'lucide-react';

export const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | MGM Hotels & Resorts</title>
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-[#DCE2E9] shadow-sm space-y-6 text-gray-700 leading-relaxed text-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C90028] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Terms of Service
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#20262D]">
            Terms & Conditions of Reservation
          </h1>
          <p className="text-xs text-gray-400">Effective: February 2026</p>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="font-bold text-base text-[#20262D]">1. Direct Booking Guarantees</h2>
            <p>Direct bookings on this official portal qualify for our Best Rate Guarantee, flexible 48-hour cancellation, and complimentary breakfast benefits as specified during room checkout.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bold text-base text-[#20262D]">2. Check-In & Check-Out Norms</h2>
            <p>Standard check-in is at 14:00 (2:00 PM) and check-out is at 12:00 (12:00 PM). Government-approved photo identity (Aadhaar, Passport, Voter ID or Driving License) is mandatory for all staying guests above 18 years.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bold text-base text-[#20262D]">3. Cancellation & No-Show Policy</h2>
            <p>Cancellations made 48 hours or more prior to arrival date are 100% refundable. Cancellations made within 48 hours will incur standard one-night tariff retention.</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Terms;

