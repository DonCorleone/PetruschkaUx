import {Component, OnInit} from '@angular/core';


@Component({
	selector: 'app-promo',
	templateUrl: './promo.component.html',
	styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

	title: string;

	dateGte: Date = new Date();
	dateLt: Date = new Date('2099-12-31Z23:59:59:999');

	constructor() {
	}

	ngOnInit(): void {
		this.title = 'Petruschka';
	}
}
