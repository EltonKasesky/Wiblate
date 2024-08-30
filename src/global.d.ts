import * as $ from 'jquery';

declare global {
  interface Window {
    jQuery:  any;
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
  
  interface JQuery {
    owlCarousel(options?: any): JQuery;
  }
}

export {};
