import React from "react";
import GenderSection from "../videos/VideoSectionGender";

interface GastronomyProps {
  id: string;
}

const Gastronomy: React.FC<GastronomyProps> = ({ id }) => {
  return (
    <>
      {/* FRONT END SECTION */}
      <div className="section" id={id}>
        <div className="container">
          <div className="section-header">Gastronomia</div>
          <div className="videos-carousel">
            <GenderSection sectionId="Gastronomy-carousel-section" endpoint="/api/Gender/gastronomy" />
          </div>
        </div>
      </div>
      {/* END FRONT END SECTION */}
    </>
  );
}

export default Gastronomy;