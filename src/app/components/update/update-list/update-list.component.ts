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

		const eventDetails: EventDetail[] = [
			{
				"_id": 0,
				"defaultLanguageId": 0,
				"organizerId": 0,
				"status": 0,
				"maxTickets": 0,
				"maxTicketsProOrder": 0,
				"countryId": 0,
				"openDoor": new Date("2021-08-21T13:00:00Z"),
				"start": new Date("2020-08-21T13:00:00Z"),
				"end": new Date("2021-08-21T13:00:00Z"),
				"eventGenreValue": 0,
				"hideOnEventList": true,
				"hideEventInfoOnSoldOut": true,
				"dateCreated": new Date("2021-08-21T13:00:00Z"),
				"dateModified": new Date("2021-08-21T13:00:00Z"),
				"postSaleCloseStatus": 0,
				"isCompanyNameMandatory": true,
				"isPhoneMandatory": true,
				"tenantId": 0,
				"noVatOnCommission": true,
				"shippingFee": 0,
				"sendNotificationByEmail": true,
				"sendWarning": true,
				"salesWarningLevel": 0,
				"salesRegionId": 0,
				"showLinkToGoogleMap": true,
				"latitude": 0,
				"longitude": 0,
				"stay22Active": true,
				"isBankInternalEvent": true,
				"facebookPixelId": "2020s",
				"forceEmptySeats": 0,
				"eventInfos": [],
				"ticketTypes": []
			}, {
				"_id": 0,
				"defaultLanguageId": 0,
				"organizerId": 0,
				"status": 0,
				"maxTickets": 0,
				"maxTicketsProOrder": 0,
				"countryId": 0,
				"openDoor": new Date("2021-08-21T13:00:00Z"),
				"start": new Date("2020-08-21T13:00:00Z"),
				"end": new Date("2021-08-21T13:00:00Z"),
				"eventGenreValue": 0,
				"hideOnEventList": true,
				"hideEventInfoOnSoldOut": true,
				"dateCreated": new Date("2021-08-21T13:00:00Z"),
				"dateModified": new Date("2021-08-21T13:00:00Z"),
				"postSaleCloseStatus": 0,
				"isCompanyNameMandatory": true,
				"isPhoneMandatory": true,
				"tenantId": 0,
				"noVatOnCommission": true,
				"shippingFee": 0,
				"sendNotificationByEmail": true,
				"sendWarning": true,
				"salesWarningLevel": 0,
				"salesRegionId": 0,
				"showLinkToGoogleMap": true,
				"latitude": 0,
				"longitude": 0,
				"stay22Active": true,
				"isBankInternalEvent": true,
				"facebookPixelId": "2020s",
				"forceEmptySeats": 0,
				"eventInfos": [],
				"ticketTypes": []
			}, {
				"_id": 0,
				"defaultLanguageId": 0,
				"organizerId": 0,
				"status": 0,
				"maxTickets": 0,
				"maxTicketsProOrder": 0,
				"countryId": 0,
				"openDoor": new Date("2021-08-21T13:00:00Z"),
				"start": new Date("2021-08-21T13:00:00Z"),
				"end": new Date("2021-08-21T13:00:00Z"),
				"eventGenreValue": 0,
				"hideOnEventList": true,
				"hideEventInfoOnSoldOut": true,
				"dateCreated": new Date("2021-08-21T13:00:00Z"),
				"dateModified": new Date("2021-08-21T13:00:00Z"),
				"postSaleCloseStatus": 0,
				"isCompanyNameMandatory": true,
				"isPhoneMandatory": true,
				"tenantId": 0,
				"noVatOnCommission": true,
				"shippingFee": 0,
				"sendNotificationByEmail": true,
				"sendWarning": true,
				"salesWarningLevel": 0,
				"salesRegionId": 0,
				"showLinkToGoogleMap": true,
				"latitude": 0,
				"longitude": 0,
				"stay22Active": true,
				"isBankInternalEvent": true,
				"facebookPixelId": "2021s",
				"forceEmptySeats": 0,
				"eventInfos": [],
				"ticketTypes": []
			}, {
				"_id": 0,
				"defaultLanguageId": 0,
				"organizerId": 0,
				"status": 0,
				"maxTickets": 0,
				"maxTicketsProOrder": 0,
				"countryId": 0,
				"openDoor": new Date("2021-08-21T13:00:00Z"),
				"start": new Date("2021-08-21T13:00:00Z"),
				"end": new Date("2021-08-21T13:00:00Z"),
				"eventGenreValue": 0,
				"hideOnEventList": true,
				"hideEventInfoOnSoldOut": true,
				"dateCreated": new Date("2021-08-21T13:00:00Z"),
				"dateModified": new Date("2021-08-21T13:00:00Z"),
				"postSaleCloseStatus": 0,
				"isCompanyNameMandatory": true,
				"isPhoneMandatory": true,
				"tenantId": 0,
				"noVatOnCommission": true,
				"shippingFee": 0,
				"sendNotificationByEmail": true,
				"sendWarning": true,
				"salesWarningLevel": 0,
				"salesRegionId": 0,
				"showLinkToGoogleMap": true,
				"latitude": 0,
				"longitude": 0,
				"stay22Active": true,
				"isBankInternalEvent": true,
				"facebookPixelId": "2021s",
				"forceEmptySeats": 0,
				"eventInfos": [],
				"ticketTypes": []
			}
		];


		from(eventDetails)
			.pipe(
				groupBy(
					eventDetail => eventDetail.start,
					p => p
				),
				mergeMap(group => zip(of(group.key), group.pipe(toArray())))
			)
			.subscribe(console.log);

	}
}
