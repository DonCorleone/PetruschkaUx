import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EventDetail} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';

@Component({
	selector: 'app-update-list',
	templateUrl: './update-list.component.html',
	styleUrls: ['./update-list.component.scss']
})
export class UpdateListComponent implements OnInit {


	@Input() dateGte: Date;
	@Input() dateLt: Date;

	eventDetails$: Observable<EventDetail[]>;

	constructor(private eventService: EventService) {

	}

	ngOnInit() {
		this.eventDetails$ = this.eventService.GetUpcomingEventDetails(this.dateGte, this.dateLt);
	}
}
