import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { from, of, zip, Observable } from 'rxjs';
import { groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { EventDetail, EventDetailViewModel } from 'src/app/models/event.models';
import { EventService } from 'src/app/services/event.service';

@Component({
	selector: 'app-update-list',
	templateUrl: './update-list.component.html',
	styleUrls: ['./update-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateListComponent implements OnInit {


	@Input() dateGte: Date;
	@Input() dateLt: Date;
	@Input() usage: string;

	eventDetails$: Observable<EventDetailViewModel[]>;

	constructor(private eventService: EventService) {

	}

	ngOnInit() {
		if (this.usage === "history") {
			this.eventDetails$ = this.eventService.GetPastEventDetails();
		} else {
			this.eventDetails$ =this.eventService.GetUpcomingEventDetails();
		}
	}
}
