import React from "react";
import VideoSection from "@/components/VideoSection";

interface HardwareProps {
  id: string;
}

const Hardware: React.FC<HardwareProps> = ({ id }) => {
  return (
    <>
      {/* FRONT END SECTION */}
      <div className="section" id={id}>
        <div className="container">
          <div className="section-header">Hardware</div>
          <div className="videos-carousel">
            <VideoSection sectionId="hardware-carousel-section" endpoint="/api/videos/hardware/" />
          </div>
        </div>
      </div>
      {/* END FRONT END SECTION */}
    </>
  );
}

export default Hardware;
