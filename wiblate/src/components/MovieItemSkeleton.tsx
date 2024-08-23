import React from 'react';
import { cn } from "@/lib/utils"

interface MovieItemSkeletonProps {
  className?: string;
  [key: string]: any; // Permite passar outras props, se necessário
}

const MovieItemSkeleton: React.FC<MovieItemSkeletonProps> = ({ className, ...props }) => {
  return (
    <div className={cn("relative w-full h-100 overflow-hidden rounded-lg shadow-lg bg-gray-200", className)} {...props}>
      <div className="w-full h-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 animate-pulse"></div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 rounded-b-lg">
        <div className="h-6 bg-gray-600 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-500 rounded w-1/2 animate-pulse"></div>
      </div>
      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/10 via-transparent to-transparent h-10 rounded-t-lg"></div>
    </div>
  );
};

export default MovieItemSkeleton;