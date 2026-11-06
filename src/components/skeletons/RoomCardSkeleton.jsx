import React from 'react';
import Skeleton from './Skeleton';
import ImageSkeleton from './ImageSkeleton';

export const RoomCardSkeleton = ({ className = '', horizontal = false }) => {
  if (horizontal) {
    return (
      <div className={`bg-white rounded-2xl border border-[#DCE2E9] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 ${className}`}>
        <div className="lg:col-span-5 relative">
          <ImageSkeleton aspectRatio="aspect-[16/11] lg:aspect-auto lg:h-full" rounded="rounded-none" />
        </div>
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-4 mb-2">
              <div>
                <Skeleton className="h-4 w-28 rounded-md mb-2" />
                <Skeleton className="h-7 w-64 rounded-md" />
              </div>
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full rounded-md mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-[#F2F5F9] my-4">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#F2F5F9]">
            <div>
              <Skeleton className="h-3 w-20 rounded-md mb-1" />
              <Skeleton className="h-7 w-32 rounded-md" />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Skeleton className="h-11 w-32 rounded-lg flex-1 sm:flex-none" />
              <Skeleton className="h-11 w-36 rounded-lg flex-1 sm:flex-none" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-[#DCE2E9] overflow-hidden shadow-sm flex flex-col ${className}`}>
      <ImageSkeleton aspectRatio="aspect-[16/11]" rounded="rounded-none" />
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <Skeleton className="h-4 w-24 rounded-md mb-2" />
          <Skeleton className="h-6 w-3/4 rounded-md mb-3" />
          <Skeleton className="h-4 w-full rounded-md mb-4" />
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
        </div>
        <div className="pt-4 border-t border-[#F2F5F9] flex items-center justify-between">
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default RoomCardSkeleton;

