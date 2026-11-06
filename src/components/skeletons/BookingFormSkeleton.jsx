import React from 'react';
import Skeleton from './Skeleton';

export const BookingFormSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-[#DCE2E9] p-6 lg:p-8 max-w-6xl mx-auto w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Destination */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        {/* Check In */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        {/* Check Out */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        {/* Guests & Rooms */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-28 rounded-md" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
        {/* Button */}
        <div>
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default BookingFormSkeleton;

