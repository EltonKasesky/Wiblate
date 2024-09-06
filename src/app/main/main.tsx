import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import PrimarySlide from '../../components/main/PrimarySlide';
import Gender from '@/components/main/Gender';
import NetworkStructure from '../../components/main/NetworkStructure';
import Dados from '../../components/main/DatabaseSection';
import ProgrammingLogic from '../../components/main/Logic';
import Hardware from '../../components/main/Hardware';
import NetworkSlide from '../../components/main/NetworkSlide';

export default function Main() {
  const pathname = usePathname();

  useEffect(() => {
    const initializeCarousels = () => {
      if (typeof window !== 'undefined' && window.jQuery && typeof window.jQuery.fn.owlCarousel === 'function') {
        const carousels = [
          { id: '#logic', items: 3, loop: true, nav: true, dots: false, autoplay: false, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } } },
          { id: '#database-section', items: 3, loop: true, nav: true, dots: false, autoplay: false, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } } },
          { id: '#network-structure', items: 4, loop: true, nav: true, dots: false, autoplay: false, responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 4 } } },
          { id: '#hardware-section', items: 5, loop: true, nav: true, dots: false, autoplay: false, responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 5 } } }
        ];

        carousels.forEach(({ id, items, loop, nav, dots, autoplay, responsive }) => {
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
            responsive
          });
        });
      }
    };
    setTimeout(initializeCarousels, 0);

  }, [pathname]);

  return (
    <>
      <Script
        src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
        crossOrigin="anonymous"
        strategy='beforeInteractive'
      />
      
      <div className='py-8'>
        <PrimarySlide />
        <Gender />
        <ProgrammingLogic id="logic" />
        <Dados id="database-section" />
        <Hardware id="hardware-section" />
        <NetworkSlide />
        <NetworkStructure id="network-structure" />
      </div>
    </>
  );
}