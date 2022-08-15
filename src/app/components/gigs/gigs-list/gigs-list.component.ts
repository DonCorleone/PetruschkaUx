import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EventDetail, EventDetailEventInfo, TicketPrice} from 'src/app/models/event.models';
import {EventService} from 'src/app/services/event.service';

@Component({
	selector: 'app-gigs-list',
	templateUrl: './gigs-list.component.html',
	styleUrls: ['./gigs-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GigsListComponent {

	eventDetailsUpcoming$ = this.eventService.upcomingGigs$;

	constructor(private eventService: EventService) {
	}


	GetEventInfoFromEventDetail(eventDetail: EventDetail): EventDetailEventInfo {
		return eventDetail.eventInfos?.find(p => p.languageId === 0);
	}

	GetPricesStringFromEventDetail(eventDetail: EventDetail): TicketPrice[] {
		return EventService.GetPricesStringFromEventDetail(eventDetail);
	}

	GetPreSaleStartFromEventDetail(eventDetail: EventDetail): Date {
		const ticketTypes = EventService.getSortedTicketType(eventDetail);
		return ticketTypes && ticketTypes?.length > 0 ? ticketTypes[0].preSaleStart : null;
	}
}
