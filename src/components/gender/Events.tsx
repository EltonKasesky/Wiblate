import React from "react";
import GenderSection from "../videos/VideoSectionGender";

interface EventsProps {
  id: string;
}

const Events: React.FC<EventsProps> = ({ id }) => {
  return (
    <>
      {/* FRONT END SECTION */}
      <div className="section" id={id}>
        <div className="container">
          <div className="section-header">Eventos</div>
          <div className="videos-carousel">
            <GenderSection sectionId="Events-carousel-section" endpoint="/api/gender/events" />
          </div>
        </div>
      </div>
      {/* END FRONT END SECTION */}
    </>
  );
}

export default Events;