import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { LoadingIndicatorComponent } from "../../loading-indicator/loading-indicator.component";
import { UpdateListComponent } from "../../update/update-list/update-list.component";
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { PromoCarouselComponent } from '../promo-carousel/promo-carousel.component';


@Component({
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss'],
    standalone: true,
    imports: [LoadingIndicatorComponent, UpdateListComponent, PromoCarouselComponent, DatePipe, NgClass, NgIf],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoComponent implements OnInit {

	title: string;

	dateGte: Date = new Date();
	dateLt: Date = new Date(new Date().setFullYear(2099));
	hasData = true;

	hasDataChanged(hasData: boolean) {
		this.hasData = hasData;
	}

	ngOnInit(): void {
		this.title = 'Petruschka';
	}
}
