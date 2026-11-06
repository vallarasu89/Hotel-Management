import React from 'react';
import Skeleton from './Skeleton';

export const CheckoutSkeleton = ({ className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 ${className}`}>
      {/* Checkout Form */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE2E9] space-y-6">
          <Skeleton className="h-7 w-48 rounded-md" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          </div>
        </div>

        {/* Payment Skeleton */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DCE2E9] space-y-4">
          <Skeleton className="h-7 w-44 rounded-md" />
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>

      {/* Booking Summary Card */}
      <div className="lg:col-span-4">
        <div className="bg-white p-6 rounded-2xl border border-[#DCE2E9] space-y-4 shadow-sm">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-36 w-full rounded-xl" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
          <div className="pt-4 border-t border-[#F2F5F9] space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
            <div className="flex justify-between pt-2 border-t border-[#F2F5F9]">
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-6 w-28 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;

