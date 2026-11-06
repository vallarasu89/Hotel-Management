import React from 'react';
import Skeleton from './Skeleton';

export const ProfileSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-[#DCE2E9] p-8 shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-[#F2F5F9]">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2 text-center md:text-left flex-1">
          <Skeleton className="h-7 w-48 rounded-md" />
          <Skeleton className="h-4 w-64 rounded-md" />
          <div className="flex gap-2 justify-center md:justify-start pt-2">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-36 rounded-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-28 rounded-md" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;

