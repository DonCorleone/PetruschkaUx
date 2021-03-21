import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EventDetail, EventDetailEventInfo} from 'src/app/models/event.models';
import {EventService, TicketPrice} from 'src/app/services/event.service';

@Component({
	selector: 'app-gigs-list',
	templateUrl: './gigs-list.component.html',
	styleUrls: ['./gigs-list.component.scss']
})
export class GigsListComponent implements OnInit {

	eventDetailsUpcoming$: Observable<EventDetail[]>;

	constructor(private eventService: EventService) {
	}

	ngOnInit() {
		this.eventDetailsUpcoming$ = this.eventService.GetUpcomingGigs();
	}

	GetEventInfoFromEventDetail(eventDetail: EventDetail): EventDetailEventInfo {
		return eventDetail.eventInfos.find(p => p.languageId === 1);
	}

	GetPricesStringFromEventDetail(eventDetail: EventDetail): TicketPrice[] {
		return EventService.GetPricesStringFromEventDetail(eventDetail);
	}

	GetPreSaleStartFromEventDetail(eventDetail: EventDetail): Date {
		const ticketTypes = EventService.getSortedTicketType(eventDetail);
		return ticketTypes && ticketTypes?.length > 0 ? ticketTypes[0].preSaleStart : null;
	}
}
