import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel-promo',
  templateUrl: './carousel-promo.component.html',
  styleUrls: ['./carousel-promo.component.scss']
})
export class CarouselPromoComponent {

  constructor(config: NgbCarouselConfig) {

    // customize default values of carousels used by this component tree
    config.interval = 6000;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
  }
}
