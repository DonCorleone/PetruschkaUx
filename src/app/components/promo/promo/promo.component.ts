import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';


@Component({
	selector: 'app-promo',
	templateUrl: './promo.component.html',
	styleUrls: ['./promo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromoComponent implements OnInit {

	title: string;

	dateGte: Date = new Date();
	dateLt: Date = new Date(new Date().setFullYear(2099));;

	constructor() {
	}

	ngOnInit(): void {
		this.title = 'Petruschka';
	}
}
