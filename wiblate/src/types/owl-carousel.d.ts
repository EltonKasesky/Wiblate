import * as $ from 'jquery';

declare module 'owl.carousel' {
  interface JQuery {
    owlCarousel(options?: any): JQuery;
    destroy(): JQuery;
  }
}
