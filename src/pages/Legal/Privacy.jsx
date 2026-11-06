import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck } from 'lucide-react';

export const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | MGM Hotels & Resorts</title>
      </Helmet>

      <div className="bg-[#F2F5F9] min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-[#DCE2E9] shadow-sm space-y-6 text-gray-700 leading-relaxed text-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C90028] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Legal & Data Privacy
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#20262D]">
            Privacy & Guest Data Policy
          </h1>
          <p className="text-xs text-gray-400">Last updated: February 2026</p>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="font-bold text-base text-[#20262D]">1. Commitment to Guest Privacy</h2>
            <p>MGM Hotels & Resorts ("we", "us", or "our") holds your privacy in highest regard. This notice outlines how information gathered through our web properties is processed with utmost confidentiality and industry-standard security protocols.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bold text-base text-[#20262D]">2. Information We Collect</h2>
            <p>During direct reservation or loyalty club sign-up, we collect name, contact details, stay preferences, and simulated booking parameters strictly for fulfilling guest reservations.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bold text-base text-[#20262D]">3. Frontend Demonstration Notice</h2>
            <p>This web application is a frontend demonstration showcase. No real banking details, credit card security codes, or live payment credentials are stored or processed on external servers.</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Privacy;

