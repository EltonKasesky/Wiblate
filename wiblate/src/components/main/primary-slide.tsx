import { useEffect } from 'react';
import Image from 'next/image';

export default function PrimarySlide() {
  useEffect(() => {
    // Verifica se estamos no ambiente do navegador (cliente)
    if (typeof window !== 'undefined') {
      const initializeCarousel = () => {
        const $ = (window as any).jQuery;
        if ($) {
          // Certifica-se de que o Owl Carousel foi carregado corretamente
          if ($.fn.owlCarousel) {
            const navText = ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"];

            $('#hero-carousel').owlCarousel({
              items: 1,
              dots: false,
              loop: true,
              nav: true,
              navText: navText,
              autoplay: true,
              autoplayHoverPause: true
            });

            $('#top-carousel-section').owlCarousel({
              items: 2,
              dots: false,
              loop: true,
              autoplay: true,
              autoplayHoverPause: true,
              responsive: {
                500: { items: 3 },
                1280: { items: 4 },
                1600: { items: 6 }
              }
            });

            $('.movies-slide').owlCarousel({
              items: 2,
              dots: false,
              nav: true,
              navText: navText,
              margin: 15,
              responsive: {
                500: { items: 2 },
                1280: { items: 4 },
                1600: { items: 6 }
              }
            });
          } else {
            console.error('Owl Carousel plugin não foi carregado corretamente.');
          }
        } else {
          console.error('jQuery não está disponível.');
        }
      };

      // Inicializa o carrossel quando o componente for montado
      initializeCarousel();
    }
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className='hero-section pt-8'>
        {/* HERO SLIDE */}
        <div className='hero-slide'>
          <div className='owl-carousel carousel-nav-center' id='hero-carousel'>
            {/* SLIDE ITEM */}
            <div className='hero-slide-item'>
              <Image src='/slides/programming-code-backend.jpg' alt='Black Panther' width={1920} height={1080} priority />
              <div className='overlay'></div>
              <div className='hero-slide-item-content'>
                <div className='item-content-wraper'>
                  <div className='item-content-title top-down'>Revisão</div>
                  <div className='movie-infos top-down delay-2'>
                    <div className='movie-info'><i className='bx bxs-star'></i><span>9.5</span></div>
                    <div className='movie-info'><i className='bx bxs-time'></i><span>120 mins</span></div>
                    <div className='movie-info'><span>HD</span></div>
                    <div className='movie-info'><span>Educação</span></div>
                  </div>
                  <div className='item-content-description top-down delay-4'>
                    A revisão é um processo crucial para consolidar o conhecimento e garantir a compreensão dos tópicos abordados.
                    Envolve a repetição e a análise crítica do material estudado para aprimorar o desempenho e o entendimento geral.
                  </div>
                  <div className='item-action top-down delay-6'>
                    <a href='#' className='btn btn-hover'>
                      <i className='bx bxs-right-arrow'></i>
                      <span className='relative z-10 p-2'>Assistir Agora</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* END SLIDE ITEM */}
            {/* SLIDE ITEM */}
            <div className='hero-slide-item'>
              <Image src='/slides/programming-code-frontend.jpg' alt='Supergirl' width={1920} height={1080} priority />
              <div className='overlay'></div>
              <div className='hero-slide-item-content'>
                <div className='item-content-wraper'>
                  <div className='item-content-title top-down'>Lógica de Programação</div>
                  <div className='movie-infos top-down delay-2'>
                    <div className='movie-info'><i className='bx bxs-star'></i><span>9.5</span></div>
                    <div className='movie-info'><i className='bx bxs-time'></i><span>120 mins</span></div>
                    <div className='movie-info'><span>HD</span></div>
                    <div className='movie-info'><span>Educação</span></div>
                  </div>
                  <div className='item-content-description top-down delay-4'>
                    A lógica de programação é a base para criar algoritmos e desenvolver soluções de software.
                    Envolve a criação de instruções passo a passo para resolver problemas e implementar funcionalidades.
                  </div>
                  <div className='item-action top-down delay-6'>
                    <a href='#' className='btn btn-hover'>
                      <i className='bx bxs-right-arrow'></i>
                      <span className='relative z-10 p-2'>ASSISTA AGORA</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* END SLIDE ITEM */}
            {/* SLIDE ITEM */}
            <div className='hero-slide-item'>
              <Image src='/slides/network.jpg' alt='Wanda Vision' width={1920} height={1080} priority />
              <div className='overlay'></div>
              <div className='hero-slide-item-content'>
                <div className='item-content-wraper'>
                  <div className='item-content-title top-down'>Rede</div>
                  <div className='movie-infos top-down delay-2'>
                    <div className='movie-info'><i className='bx bxs-star'></i><span>9.5</span></div>
                    <div className='movie-info'><i className='bx bxs-time'></i><span>120 mins</span></div>
                    <div className='movie-info'><span>HD</span></div>
                    <div className='movie-info'><span>Infraestrutura</span></div>
                  </div>
                  <div className="item-content-description top-down delay-4">
                    O banco de dados é uma coleção estruturada de dados que pode ser gerenciada e acessada de maneira eficiente.
                    Ele armazena informações essenciais para suportar operações de negócios e sistemas de informação.
                  </div>
                  <div className="item-action top-down delay-6">
                    <a href="#" className="btn btn-hover">
                      <i className="bx bxs-right-arrow"></i>
                      <span className="relative z-10 p-2">Assistir Agora</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* END SLIDE ITEM */}
          </div>
        </div>
        {/* END HERO SLIDE */}
      </div>
      {/* END HERO SECTION */}
    </>
  );
}
