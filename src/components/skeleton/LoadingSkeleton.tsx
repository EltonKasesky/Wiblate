"use client";

import { Skeleton } from './MembersSkeleton';
import React from 'react';

const LoadingSkeleton = () => (
  <div className="bg-white border border-slate-200 shadow-md p-12 rounded-lg">
    <div className="flex flex-col space-y-2.5 animate-fade-in">
      <Skeleton className="w-24 max-w-full h-4" />
      <Skeleton className="w-40 max-w-full h-4" />
    </div>
    <div className="mt-4">
      <Skeleton className="border border-gray-300 px-3 py-2 w-full rounded-md h-8" />
    </div>
  </div>
);

export default LoadingSkeleton;
