import React from 'react';
import Skeleton from './Skeleton';

export const HeroSkeleton = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-[88vh] min-h-[600px] bg-[#15191E] flex flex-col justify-center items-center px-4 overflow-hidden ${className}`}>
      {/* Dark Shimmer background */}
      <Skeleton className="absolute inset-0 w-full h-full opacity-30" dark={true} />

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center flex flex-col items-center">
        {/* Subtitle tag */}
        <Skeleton className="h-6 w-52 rounded-full mb-6" dark={true} />
        {/* Main Headline */}
        <Skeleton className="h-12 sm:h-16 w-4/5 rounded-lg mb-4" dark={true} />
        <Skeleton className="h-10 sm:h-14 w-3/5 rounded-lg mb-6" dark={true} />
        {/* Paragraph */}
        <Skeleton className="h-4 w-2/3 rounded-md mb-2" dark={true} />
        <Skeleton className="h-4 w-1/2 rounded-md mb-10" dark={true} />
        {/* Buttons */}
        <div className="flex gap-4">
          <Skeleton className="h-12 w-44 rounded-lg" dark={true} />
          <Skeleton className="h-12 w-40 rounded-lg" dark={true} />
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;

