import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EventDetail} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';

@Component({
	selector: 'app-merch-list',
	templateUrl: './merch-list.component.html',
	styleUrls: ['./merch-list.component.scss']
})
export class MerchListComponent implements OnInit {

	eventDetailsTournee$: Observable<EventDetail[]>;

	constructor(private eventService: EventService) {
	}

	ngOnInit() {
		this.eventDetailsTournee$ = this.eventService.GetEventDetails(p => p.googleAnalyticsTracker === 'Tournee');
	}
}
