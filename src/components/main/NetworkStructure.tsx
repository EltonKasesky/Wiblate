import React from "react";
import VideoSection from "../videos/VideoSection";

interface NetworkStructureProps {
  id: string;
}

const NetworkStructure: React.FC<NetworkStructureProps> = ({ id }) => {
  return (
    <>
      {/* FRONT END SECTION */}
      <div className="section" id={id}>
        <div className="container">
          <div className="section-header">Estrutura de Rede</div>
          <div className="videos-carousel">
            <VideoSection sectionId="network-carousel-section" endpoint="/api/videos/network/" />
          </div>
        </div>
      </div>
      {/* END FRONT END SECTION */}
    </>
  );
}

export default NetworkStructure;
