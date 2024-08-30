import React from "react";
import VideoSection from "../videos/VideoSection";

interface ProgrammingLogicProps {
  id: string;
}

const ProgrammingLogic: React.FC<ProgrammingLogicProps> = ({ id }) => {
  return (
    <>
      {/* FRONT END SECTION */}
      <div className="section" id={id}>
        <div className="container">
          <div className="section-header">Lógica de Programação</div>
          <div className="videos-carousel">
            <VideoSection sectionId="logic-carousel-section" endpoint="/api/videos/Plogic/" />
          </div>
        </div>
      </div>
      {/* END FRONT END SECTION */}
    </>
  );
};

export default ProgrammingLogic;
