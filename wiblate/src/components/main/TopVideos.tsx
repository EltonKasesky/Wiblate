import React from 'react';
import VideoSection from '@/components/VideoSectionTop';

const TopVideos = () => {
  return (
    <>
      {/* TOP VIDEOS SLIDE */}
      <div className="videos-carousel">
        <VideoSection sectionId="top-carousel-section" endpoint="/api/videos/primary/" />
      </div>
      {/* END TOP VIDEOS SLIDE */}
    </>
  );
};

export default TopVideos;