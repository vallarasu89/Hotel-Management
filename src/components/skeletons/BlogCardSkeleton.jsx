import React from 'react';
import Skeleton from './Skeleton';
import ImageSkeleton from './ImageSkeleton';

export const BlogCardSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-[#DCE2E9] overflow-hidden shadow-sm flex flex-col ${className}`}>
      <ImageSkeleton aspectRatio="aspect-[16/10]" rounded="rounded-none" />
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
          <Skeleton className="h-6 w-11/12 rounded-md mb-2" />
          <Skeleton className="h-4 w-full rounded-md mb-2" />
          <Skeleton className="h-4 w-4/5 rounded-md mb-4" />
        </div>
        <div className="pt-4 border-t border-[#F2F5F9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;

