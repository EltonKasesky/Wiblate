import React from "react";
import GenderSection from "../videos/VideoSectionGender";

interface KnowProps {
  id: string;
}

const Know: React.FC<KnowProps> = ({ id }) => {
  return (
    <>
      {/* FRONT END SECTION */}
      <div className="section" id={id}>
        <div className="container">
          <div className="section-header">Conheça a Cidade</div>
          <div className="videos-carousel">
            <GenderSection sectionId="Know-carousel-section" endpoint="/api/gender/know" />
          </div>
        </div>
      </div>
      {/* END FRONT END SECTION */}
    </>
  );
}

export default Know;