import React from "react";
import GenderSection from "../videos/VideoSectionGender";

interface NewsProps {
  id: string;
}

const News: React.FC<NewsProps> = ({ id }) => {
  return (
    <>
      {/* FRONT END SECTION */}
      <div className="section" id={id}>
        <div className="container">
          <div className="section-header">Notícias</div>
          <div className="videos-carousel">
            <GenderSection sectionId="News-carousel-section" endpoint="/api/gender/news" />
          </div>
        </div>
      </div>
      {/* END FRONT END SECTION */}
    </>
  );
}

export default News;