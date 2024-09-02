import Image from "next/image"

export default function NetworkSlide() {
  return (
    <>
      {/* CLOUD SLIDE SECTION */}
      <section className="section">
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, tempora laborum aut error libero nulla inventore doloribus explicabo
                numquam ad architecto eligendi, voluptates nesciunt facere, neque voluptatibus. Neque, alias? Consequuntur.
              </div>
              <div className='item-action delay-6'>
                <a href='#' className='btn btn-hover'>
                  <i className='bx bx-play bx-flip-vertical text-white text-4xl'></i>
                  <span className='relative z-10 p-2'>ASSISTA AGORA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END CLOUD SLIDE SECTION */}
    </>
  )
}