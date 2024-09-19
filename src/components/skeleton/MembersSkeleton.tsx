import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div aria-live="polite" aria-busy="true" className={`${className} relative overflow-hidden`}>
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-100 animate-skeleton-fade" />
    <span className="inline-flex w-full rounded-md bg-gray-100" style={{ height: '100%' }}>
    </span>
  </div>
);

const SVGSkeleton: React.FC<SkeletonProps> = ({ className }) => (
  <svg className={`${className} animate-skeleton-fade rounded bg-gray-100`} />
);

export { Skeleton, SVGSkeleton };
