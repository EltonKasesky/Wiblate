"use client";

import { Skeleton } from '@/components/MembersSkeleton';

const LoadingSkeleton = () => (
  <div className="border border-slate-200 shadow-sm dark:border-slate-800 p-4">
    <div className="flex flex-col space-y-1.5 p-6">
      <Skeleton className="w-[88px] max-w-full" />
      <Skeleton className="w-[168px] max-w-full" />
    </div>
    <div className="p-6 pt-0">
      <Skeleton className="border border-gray-800 px-2 py-1 w-full" />
    </div>
  </div>
);

export default LoadingSkeleton;
