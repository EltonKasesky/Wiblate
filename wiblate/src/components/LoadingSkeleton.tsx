import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 leading-none">
      {/* Placeholder content */}
    </span>
  </div>
);

const LoadingSkeleton = () => (
  <div className="border border-slate-200 shadow-sm dark:border-slate-800 p-4 rounded-md">
    <div className="flex flex-col space-y-1.5 p-6">
      <Skeleton className="w-[88px] max-w-full" />
      <Skeleton className="w-[168px] max-w-full" />
    </div>
    <div className="p-6 pt-0">
      <Skeleton className="border border-gray-800 px-2 py-1 w-full rounded-md" />
    </div>
  </div>
);

export default LoadingSkeleton;
