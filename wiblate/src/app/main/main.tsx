import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Importações de estilos do Owl Carousel
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// Componentes
import PrimarySlide from '../../components/main/primary-slide';
import NetworkStructure from '../../components/main/network-structure';
import Dados from '../../components/main/database-section';
import ProgrammingLogic from '../../components/main/logic';
import Hardware from '../../components/main/hardware';
import NetworkSlide from '../../components/main/network-slide';
import TopVideos from '../../components/main/top-videos';

export default function Main() {
  const [carouselKey, setCarouselKey] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const initializeCarousels = () => {
      if (typeof window !== 'undefined' && window.jQuery && typeof window.jQuery.fn.owlCarousel === 'function') {
        const carousels = [
          { id: '#primary-slide', items: 1, loop: true, nav: false, dots: true, autoplay: true, autoplayTimeout: 5000, autoplayHoverPause: true },
          { id: '#top-videos', items: 5, loop: true, nav: true, dots: false, autoplay: true, autoplayTimeout: 5000, autoplayHoverPause: true, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 5 } } },
          { id: '#logic', items: 3, loop: true, nav: true, dots: false, autoplay: false, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } } },
          { id: '#database-section', items: 3, loop: true, nav: true, dots: false, autoplay: false, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } } },
          { id: '#network-structure', items: 4, loop: true, nav: true, dots: false, autoplay: false, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 4 } } },
          { id: '#hardware-section', items: 5, loop: true, nav: true, dots: false, autoplay: false, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 5 } } }
        ];

        carousels.forEach(({ id, items, loop, nav, dots, autoplay, autoplayTimeout, autoplayHoverPause, responsive }) => {
          const carouselElement = window.jQuery(id);
          if (carouselElement.data('owl.carousel')) {
            carouselElement.trigger('destroy.owl.carousel');
          }
          carouselElement.owlCarousel({
            items,
            loop,
            nav,
            dots,
            autoplay,
            autoplayTimeout,
            autoplayHoverPause,
            responsive
          });
        });
      }
    };

    setCarouselKey((prevKey) => prevKey + 1);

    setTimeout(initializeCarousels, 0);

  }, [pathname]);

  return (
    <div className='py-8'>
      <PrimarySlide key={`primary-slide-${carouselKey}`} />
      <TopVideos key={`top-videos-${carouselKey}`} />
      <ProgrammingLogic id="logic" />
      <Dados id="database-section" />
      <Hardware id="hardware-section" />
      <NetworkSlide />
      <NetworkStructure id="network-structure" />

      <Script
        src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
        crossOrigin="anonymous"
        strategy='beforeInteractive'
      />
      
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
        strategy="beforeInteractive"
      />
    </div>
  );
}