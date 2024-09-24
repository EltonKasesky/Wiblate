'use client';

import { useState, useEffect } from 'react';
import DashboardUserSkeleton from '@/components/skeleton/DashboardUserSkeleton';
import DashboardMetricsSkeleton from '@/components/skeleton/DashboardMetricsSkeleton';
import UserProfileInfo from './UserProfileInfo';
import AvatarUpload from './AvatarUpload';
import UpdatePassword from './UpdatePassword';
import VideoMetrics from './VideoMetrics';

export default function DashboardUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [componentsLoaded, setComponentsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setComponentsLoaded(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return (
      <>
        <DashboardUserSkeleton itemsCount={3} />
        <DashboardMetricsSkeleton itemsCount={1} />
      </>
    );
  }

  return (
    <>
      <section className="box-border flex items-start lg:items-stretch lg:flex-row flex-col w-full lg:h-auto lg:gap-5 gap-3 lg:p-5 p-2">
        <div className="flex-grow flex flex-col w-full min-w-[300px] h-[300px] border border-white rounded-lg lg:max-h-none">
          {componentsLoaded ? <UserProfileInfo /> : <DashboardUserSkeleton itemsCount={1} />}
        </div>

        <div className="flex-grow flex flex-col w-full min-w-[300px] h-[300px] border border-white rounded-lg lg:max-h-none">
          {componentsLoaded ? <AvatarUpload /> : <DashboardUserSkeleton itemsCount={1} />}
        </div>

        <div className="flex-grow flex flex-col w-full min-w-[300px] h-[300px] border border-white rounded-lg lg:max-h-none">
          {componentsLoaded ? <UpdatePassword /> : <DashboardUserSkeleton itemsCount={1} />}
        </div>
      </section>
      <section className="box-border flex justify-center items-center w-full h-auto lg:px-5 lg:pb-5 px-2 py-1">
        <div className="w-full h-auto">
          {componentsLoaded ? <VideoMetrics /> : <DashboardMetricsSkeleton itemsCount={1} />}
        </div>
      </section>
    </>
  );
}
