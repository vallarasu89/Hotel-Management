import React from 'react';
import Skeleton from './Skeleton';
import ImageSkeleton from './ImageSkeleton';

export const HotelCardSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-[#DCE2E9] shadow-sm flex flex-col ${className}`}>
      {/* Image container with badge placeholder */}
      <div className="relative">
        <ImageSkeleton aspectRatio="aspect-[16/11]" rounded="rounded-none" />
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
        <div className="absolute top-4 right-4">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Star Rating */}
          <div className="flex justify-between items-center mb-2.5">
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>

          {/* Hotel Title */}
          <Skeleton className="h-7 w-4/5 rounded-md mb-2" />
          {/* Tagline */}
          <Skeleton className="h-4 w-full rounded-md mb-4" />

          {/* Amenities Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-18 rounded-full" />
          </div>
        </div>

        {/* Price & CTA Button */}
        <div className="pt-4 border-t border-[#F2F5F9] flex items-center justify-between">
          <div>
            <Skeleton className="h-3 w-16 rounded-md mb-1" />
            <Skeleton className="h-6 w-28 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;

