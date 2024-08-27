"use client";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-slate-950 leading-none">
      ‌
    </span>
  </div>
);

const SVGSkeleton: React.FC<SkeletonProps> = ({ className }) => (
  <svg className={`${className} animate-pulse rounded bg-slate-950`} />
);

export { Skeleton, SVGSkeleton };
