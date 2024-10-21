import React from "react";
import VideoSection from "../videos/VideoSection";

interface MoviesProps {
  id: string;
}

const Movies: React.FC<MoviesProps> = ({ id }) => {
  return (
    <>
      {/* FRONT END SECTION */}
      <div className="section" id={id}>
        <div className="container">
          <div className="section-header">Filmes</div>
          <div className="videos-carousel">
            <VideoSection sectionId="movies-carousel-section" endpoint="/api/videos?select=movies" />
          </div>
        </div>
      </div>
      {/* END FRONT END SECTION */}
    </>
  );
}

export default Movies;
