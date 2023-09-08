import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
	selector: 'app-promo-carousel',
	templateUrl: './promo-carousel.component.html',
	styleUrls: ['./promo-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PromoCarouselComponent {

	images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

	constructor(config: NgbCarouselConfig) {

		// customize default values of carousels used by this component tree
		config.interval = 7500;
		config.keyboard = false;
		config.pauseOnHover = false;
		config.showNavigationIndicators = false;
		config.showNavigationArrows = false;
		config.animation = false;
	}
}
