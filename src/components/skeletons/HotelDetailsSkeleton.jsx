import React from 'react';
import Skeleton from './Skeleton';
import ImageSkeleton from './ImageSkeleton';

export const HotelDetailsSkeleton = ({ className = '' }) => {
  return (
    <div className={`space-y-12 max-w-7xl mx-auto px-4 py-8 ${className}`}>
      {/* Breadcrumb & Header */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-48 rounded-md" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-10 w-96 rounded-lg mb-2" />
            <Skeleton className="h-5 w-64 rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-11 w-32 rounded-xl" />
            <Skeleton className="h-11 w-40 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Hero Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[440px]">
        <div className="md:col-span-2 h-full">
          <ImageSkeleton aspectRatio="h-full w-full" rounded="rounded-2xl" />
        </div>
        <div className="grid grid-rows-2 gap-4 h-full">
          <ImageSkeleton aspectRatio="h-full w-full" rounded="rounded-2xl" />
          <ImageSkeleton aspectRatio="h-full w-full" rounded="rounded-2xl" />
        </div>
      </div>

      {/* Main Details and Sticky Booking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-[#DCE2E9] space-y-4">
            <Skeleton className="h-7 w-52 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-11/12 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>
          {/* Amenities skeleton */}
          <div className="bg-white p-8 rounded-2xl border border-[#DCE2E9] space-y-6">
            <Skeleton className="h-7 w-48 rounded-md" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border border-[#DCE2E9] space-y-4 shadow-sm sticky top-24">
            <Skeleton className="h-8 w-32 rounded-md" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsSkeleton;

