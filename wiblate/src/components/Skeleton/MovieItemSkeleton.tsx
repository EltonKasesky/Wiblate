import React from 'react';
import { cn } from "@/lib/utils"

interface MovieItemSkeletonProps {
  className?: string;
  [key: string]: any; // Permite passar outras props, se necessário
}

const MovieItemSkeleton: React.FC<MovieItemSkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("item relative w-full h-100 overflow-hidden shadow-md cursor-pointer", className)}
      {...props}
    >
      <div className="w-full h-full animate-pulse bg-slate-300 dark:bg-slate-700">
        {/* Placeholder for image */}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2">
        <div className="text-xl font-bold bg-slate-300 dark:bg-slate-700 h-6 rounded"></div>
      </div>
    </div>
  );
};

export default MovieItemSkeleton;
