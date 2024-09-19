import React from 'react';

interface DashboardUserSkeletonProps {
  itemsCount: number;
}

const DashboardUserSkeleton: React.FC<DashboardUserSkeletonProps> = ({ itemsCount }) => {
  return (
    <section className="box-border flex items-start lg:items-stretch lg:flex-row flex-col w-full lg:h-auto lg:gap-5 gap-3 lg:p-5 p-2">
      {Array.from({ length: itemsCount }).map((_, index) => (
        <div key={index} className="flex-grow flex flex-col w-full h-[300px] border border-white rounded-lg lg:max-h-none relative overflow-hidden p-4">
          <div className="animate-skeleton-fade bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
          <div className="animate-skeleton-fade bg-gray-200 h-4 w-1/2 rounded"></div>
          <div className="animate-skeleton-fade bg-gray-300 h-full w-full rounded-md mb-4 mt-5"></div>
        </div>
      ))}
    </section>
  );
};

export default DashboardUserSkeleton;
