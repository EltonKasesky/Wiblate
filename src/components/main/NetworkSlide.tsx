import Image from "next/image"

export default function NetworkSlide() {
    return (
        <>
            {/* CLOUD SLIDE SECTION */}
            <div className="section">
            <div className='hero-slide-item'>
              <Image src='/slides/network.jpg' alt='Wanda Vision' width={1920} height={1080} />
              <div className='overlay'></div>
              <div className='hero-slide-item-content'>
                <div className='item-content-wraper'>
                  <div className='item-content-title'>Rede</div>
                  <div className='movie-infos delay-2'>
                    <div className='movie-info'><i className='bx bxs-star'></i><span>9.5</span></div>
                    <div className='movie-info'><i className='bx bxs-time'></i><span>120 mins</span></div>
                    <div className='movie-info'><span>HD</span></div>
                    <div className='movie-info'><span>Infraestrutura</span></div>
                  </div>
                  <div className='item-content-description delay-4'>
                    O desenvolvimento de redes envolve a criação e gerenciamento de redes de computadores, incluindo LANs, WANs e a internet.
                    Os profissionais trabalham para garantir que a comunicação de dados seja eficiente, segura e confiável.
                  </div>
                  <div className='item-action delay-6'>
                    <a href='#' className='btn btn-hover'>
                      <i className='bx bxs-right-arrow'></i>
                      <span className='relative z-10 p-2'>ASSISTA AGORA</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </div>
            {/* END CLOUD SLIDE SECTION */}
        </>
    )
}