import React from 'react';
import ImageSkeleton from './ImageSkeleton';

export const GallerySkeleton = ({ count = 6, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="group overflow-hidden rounded-2xl bg-white border border-[#DCE2E9] shadow-sm">
          <ImageSkeleton
            aspectRatio={i % 3 === 0 ? 'aspect-[4/3]' : 'aspect-[16/10]'}
            rounded="rounded-none"
          />
        </div>
      ))}
    </div>
  );
};

export default GallerySkeleton;

