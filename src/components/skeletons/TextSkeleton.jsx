import React from 'react';
import Skeleton from './Skeleton';

export const TextSkeleton = ({
  lines = 1,
  className = '',
  lineHeight = 'h-4',
  gap = 'gap-2',
  widths = ['w-full', 'w-5/6', 'w-4/6', 'w-3/4'],
  dark = false
}) => {
  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`${lineHeight} ${widths[i % widths.length]}`}
          dark={dark}
        />
      ))}
    </div>
  );
};

export default TextSkeleton;

