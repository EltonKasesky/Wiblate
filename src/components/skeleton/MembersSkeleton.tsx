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

const SVGSkeleton: React.FC<SkeletonProps> = ({ className }) => (
  <svg className={`${className} animate-pulse rounded bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800`} />
);

export { Skeleton, SVGSkeleton };
