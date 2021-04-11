import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { EventDetail } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

	eventDetailsPremiere$: Observable<EventDetail[]>;

	constructor(private eventService: EventService) {
	}

	ngOnInit() {
		this.eventDetailsPremiere$ = this.eventService.GetEventDetails(p => p.googleAnalyticsTracker.includes('Premiere'));
	}
}
