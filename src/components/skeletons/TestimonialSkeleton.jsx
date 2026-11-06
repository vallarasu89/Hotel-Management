import React from 'react';
import Skeleton from './Skeleton';

export const TestimonialSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-[#DCE2E9] p-8 shadow-sm flex flex-col justify-between ${className}`}>
      <div>
        {/* Star rating row */}
        <div className="flex gap-1.5 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-5 rounded-full" />
          ))}
        </div>
        {/* Quote lines */}
        <Skeleton className="h-4 w-full rounded-md mb-2" />
        <Skeleton className="h-4 w-11/12 rounded-md mb-2" />
        <Skeleton className="h-4 w-3/4 rounded-md mb-6" />
      </div>

      {/* Guest profile info */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#F2F5F9]">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-3 w-44 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialSkeleton;

