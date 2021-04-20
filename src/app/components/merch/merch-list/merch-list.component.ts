import {Component, OnInit} from '@angular/core';
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
		this.eventDetailsTournee$ = this.eventService.GetEventDetails(p => p.googleAnalyticsTracker.includes('Tournee'));
	}

	get LogoWanderTheater():string{
		let imageUrl = document.location + 'assets/images/members/' + encodeURIComponent('logo-wandertheater.png');
		return "https://images.weserv.nl/?url=" + imageUrl + "&w=444&h=126";
	}

	GetName(eventDetail: EventDetail):string{
		return EventService.GetNameFromEventDetail(eventDetail);
	}

	GetImageUrl(eventDetail: EventDetail):string{
		return EventService.GetTicketTypeInfoFromEventDetail(eventDetail, 'Tournee').imageUrl;
	}
}
