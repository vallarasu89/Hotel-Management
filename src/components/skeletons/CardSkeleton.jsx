import React from 'react';
import Skeleton from './Skeleton';
import TextSkeleton from './TextSkeleton';
import ImageSkeleton from './ImageSkeleton';

export const CardSkeleton = ({ className = '', dark = false }) => {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-[#DCE2E9] shadow-sm p-4 ${className}`}>
      <ImageSkeleton aspectRatio="aspect-[16/10]" rounded="rounded-xl" dark={dark} />
      <div className="pt-4 space-y-3">
        <Skeleton className="h-6 w-3/4 rounded-md" dark={dark} />
        <TextSkeleton lines={2} lineHeight="h-3.5" gap="gap-1.5" dark={dark} />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-24 rounded-md" dark={dark} />
          <Skeleton className="h-9 w-28 rounded-lg" dark={dark} />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;

