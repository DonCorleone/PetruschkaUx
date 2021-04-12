import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EventDetail} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';

@Component({
	selector: 'app-carousel-update',
	templateUrl: './carousel-update.component.html',
	styleUrls: ['./carousel-update.component.scss']
})
export class CarouselUpdateComponent implements OnInit {


	@Input() dateGte: Date;
	@Input() dateLt: Date;

	eventDetails$: Observable<EventDetail[]>;

	constructor(private eventService: EventService) {

	}

	ngOnInit() {
		this.eventDetails$ = this.eventService.GetUpcomingEventDetails(this.dateGte, this.dateLt);
	}
}
