import { Component } from '@angular/core';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent {

	dateGte: Date = new Date('1970-01-01Z00:00:00:000');
	dateLt: Date = new Date();

	constructor() {
	}
}
