import React from 'react';
import Skeleton from './Skeleton';

export const TableSkeleton = ({ rows = 5, cols = 5, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-[#DCE2E9] overflow-hidden shadow-sm ${className}`}>
      {/* Table Header */}
      <div className="bg-[#F2F5F9] px-6 py-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1 rounded-md" />
        ))}
      </div>
      {/* Table Rows */}
      <div className="divide-y divide-[#F2F5F9]">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="px-6 py-4 flex items-center gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-5 flex-1 rounded-md" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;

