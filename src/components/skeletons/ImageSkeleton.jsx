import React from 'react';
import Skeleton from './Skeleton';

export const ImageSkeleton = ({
  aspectRatio = 'aspect-[16/10]',
  className = '',
  rounded = 'rounded-xl',
  dark = false
}) => {
  return (
    <div className={`relative w-full overflow-hidden ${aspectRatio} ${rounded} ${className}`}>
      <Skeleton className="absolute inset-0 w-full h-full" dark={dark} />
    </div>
  );
};

export default ImageSkeleton;

