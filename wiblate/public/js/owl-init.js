(function($) {
    $(document).ready(function() {
      console.log('carousel iniciado corretamente');

      $("#hero-carousel").owlCarousel({
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"],
        autoplay: true,
        autoplayHoverPause: true
      });
  
      $("#top-carousel-section").owlCarousel({
        loop: true,
        nav: true,
        navText: ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"],
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 1 },
          600: { items: 3 },
          1000: { items: 5 }
        }
      });
  
      $(".movies-slide").owlCarousel({
        loop: true,
        nav: true,
        navText: ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"],
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 1 },
          600: { items: 3 },
          1000: { items: 5 }
        }
      });
    });
  })(jQuery);
  