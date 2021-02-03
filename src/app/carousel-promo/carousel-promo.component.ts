import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel-promo',
  templateUrl: './carousel-promo.component.html',
  styleUrls: ['./carousel-promo.component.scss']
})
export class CarouselPromoComponent {

  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {

    // customize default values of carousels used by this component tree
    config.interval = 6000;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
    config.showNavigationArrows = false;
  }
}
