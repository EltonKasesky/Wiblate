import React from "react";
import VideoSection from "@/components/VideoSection";

interface DadosProps {
  id: string;
}

const Dados: React.FC<DadosProps> = ({ id }) => {
  return (
    <>
      {/* FRONT END SECTION */}
      <div className="section" id={id}>
        <div className="container">
          <div className="section-header">Banco de Dados</div>
          <div className="videos-carousel">
            <VideoSection sectionId="database-carousel-section" endpoint="/api/videos/dados/" />
          </div>
        </div>
      </div>
      {/* END FRONT END SECTION */}
    </>
  );
}

export default Dados;