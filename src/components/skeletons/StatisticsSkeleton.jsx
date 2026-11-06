import React from 'react';
import Skeleton from './Skeleton';

export const StatisticsSkeleton = ({ className = '', dark = true }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 ${className}`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={`p-6 rounded-2xl border ${dark ? 'bg-[#20262D] border-[#2C353F]' : 'bg-white border-[#DCE2E9]'} flex flex-col items-center text-center`}>
          <Skeleton className="h-10 w-24 rounded-lg mb-3" dark={dark} />
          <Skeleton className="h-5 w-36 rounded-md mb-2" dark={dark} />
          <Skeleton className="h-3 w-4/5 rounded-md" dark={dark} />
        </div>
      ))}
    </div>
  );
};

export default StatisticsSkeleton;

