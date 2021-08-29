import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { EventDetail, EventDetailEventInfo, EventDetailsResponse, GetEventInfoById, TicketPrice, TicketType, TicketTypeInfo, EventDetailViewModel, UpcomingEventDetailsResponse, PastEventDetailsResponse } from '../models/event.models';

const GET_EVENTDETAILS_BYTAG = gql`
query {
	eventDetails (
		query: {
			OR: [
				{googleAnalyticsTracker_in: "CD"}
				{googleAnalyticsTracker_in: "CD|Tournee"}
				{googleAnalyticsTracker_in: "Tournee"}
				{googleAnalyticsTracker_in: "Premiere|Tournee"}
				{googleAnalyticsTracker_in: "Tournee|CD"}
			]
		}
	)
	{
		_id,
		eventInfos{
			name
			languageId
		}
		facebookPixelId
		googleAnalyticsTracker
		ticketTypes{
			sortOrder
			ticketTypeInfos{
				languageId
				imageUrl
				name
			}
		}
	}
}
`;

const GET_UPCOMING_EVENTS = gql`
	query{
		nextGigPerUpcomingEvent{
			eventDetail{
			_id,
			eventInfos{
				name
				flyerImagePath
				shortDescription
				languageId
				importantNotes
			}
			notificationEmail
			facebookPixelId
			googleAnalyticsTracker
			start
			}
		}
	}
`;

const GET_PAST_EVENTS = gql`
	query{
		pastEvents{
			eventDetail{
			_id,
			eventInfos{
				name
				flyerImagePath
				shortDescription
				languageId
				importantNotes
			}
			notificationEmail
			facebookPixelId
			googleAnalyticsTracker
			start
			}
		}
	}
`;

const GET_EVENTINFO_BYEVENTID = gql`
  query GetEventByGroupId($eventId: Int!){
    eventDetail(query:{_id:$eventId}){
      eventInfos{
        name
        languageId
        shortDescription
        longDescription
        address
        location
        bannerImagePath
        artists
      }
			notificationEmail
			facebookPixelId
			googleAnalyticsTracker
			start
			ticketTypes{
				sortOrder
				ticketTypeInfos {
					languageId
					imageUrl
					name
					description
				}
			}
    }
  }
`;

const GET_UPCOMING_GIGS = gql`
    query GetUpcomingGigs ($today: DateTime!) {
      eventDetails (
				sortBy: START_ASC,
        query:
           	{start_gte: $today}
          ){
        _id,
        eventInfos{
          name
          location
          languageId
        },
				ticketTypes{
					sortOrder
					price
					currency
          preSaleStart
					ticketTypeInfos{
						name,
						languageId
					}
				},
        start
      }
    }
`;

@Injectable({
	providedIn: 'root'
})
export class EventService {

	constructor(private apollo: Apollo) {
	}

	static GetEventInfoFromEventDetail(eventDetail: EventDetail): EventDetailEventInfo {

		if (!eventDetail || !eventDetail.eventInfos || eventDetail.eventInfos.length === 0) {
			return null;
		}

		return (eventDetail.eventInfos.filter(
			p => p.languageId === 1))?.length > 0 ? eventDetail.eventInfos.filter(
				p => p.languageId === 1)[0] : null;
	}

	static GetTicketTypeInfoFromEventDetail(eventDetail: EventDetail, usage: string): TicketTypeInfo {

		if (!eventDetail || !eventDetail.ticketTypes || eventDetail.ticketTypes.length === 0) {
			return null;
		}

		let usageTicketTypes: TicketTypeInfo[];

		if (eventDetail.ticketTypes.length === 1) {
			usageTicketTypes = eventDetail.ticketTypes[0].ticketTypeInfos
				.filter(p => p.name.toLowerCase() === usage.toLowerCase() && p.languageId === 1);
		} else {

			for (const ticketType of eventDetail.ticketTypes) {
				usageTicketTypes = ticketType.ticketTypeInfos
					.filter(p => p.name.toLowerCase() === usage.toLowerCase() && p.languageId === 1);
				if (usageTicketTypes && usageTicketTypes.length > 0) {
					break;
				}
			}
		}
		return usageTicketTypes != null && usageTicketTypes.length > 0 ? usageTicketTypes[0] : null;
	}

	static GetPricesStringFromEventDetail(eventDetail: EventDetail): TicketPrice[] {

		if (!eventDetail || !eventDetail.ticketTypes || eventDetail.ticketTypes.length === 0) {
			return null;
		}

		let returnArray: TicketPrice[] = [];

		for (const ticketType of eventDetail.ticketTypes) {

			let name = ticketType.ticketTypeInfos
				.filter(p => p.languageId === 1)[0].name;

			let price = ticketType.price;

			let unit = ticketType.currency;

			let ticketPrice: TicketPrice = {
				name: name,
				currency: unit,
				price: price

			};

			returnArray.push(ticketPrice);
		}

		return returnArray;
	}

	static getSortedTicketType(eventDetail: EventDetail): TicketType[] {

		if (!eventDetail || !eventDetail.ticketTypes) {
			return null;
		}

		if (eventDetail.ticketTypes.length === 1) {
			return eventDetail.ticketTypes;
		}

		return eventDetail.ticketTypes;
	}

	static GetBannerImagePathPathFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
			&& eventDetail.eventInfos[0]
			&& eventDetail.eventInfos[0].bannerImagePath ?
			"https://images.weserv.nl/?url=" + eventDetail.eventInfos[0].bannerImagePath + "&w=1137&h=339" : null);
	}

	static GetFlyerImagePathFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
			&& eventDetail.eventInfos[0]
			&& eventDetail.eventInfos[0].flyerImagePath ?
			"https://images.weserv.nl/?url=" + eventDetail.eventInfos[0].flyerImagePath + "&w=195&h=269" : null);
	}

	static GetShortDescFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
			&& eventDetail.eventInfos.find(p => p.languageId === 1)?.shortDescription);
	}

	static GetNameFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
			&& eventDetail.eventInfos[0]
			&& eventDetail.eventInfos[0].name ?
			eventDetail.eventInfos[0].name : null);
	}

	static GetLongDescriptionFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
			&& eventDetail.eventInfos.find(p => p.languageId === 1)?.longDescription);
	}

	static GetImportantNotesFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
			&& eventDetail.eventInfos.find(p => p.languageId === 1)?.importantNotes);
	}

	static GetLocationFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
			&& eventDetail.eventInfos[0]
			&& eventDetail.eventInfos[0].location ?
			eventDetail.eventInfos[0].location : null);
	}

	static GetStartFromEventDetail(eventDetail: EventDetail): Date {
		return (eventDetail
			&& eventDetail.start ?
			eventDetail.start : null);
	}

	GetEventDetail(id: number): Observable<EventDetail> {
		// console.log(`load event with Item ${id}`);
		return this.apollo
			.watchQuery<GetEventInfoById>({
				query: GET_EVENTINFO_BYEVENTID,
				variables: {
					eventId: id,
				},
			})
			.valueChanges.pipe(map((result) => result.data.eventDetail));
	}

	GetUpcomingGigs(): Observable<EventDetail[]> {
		// console.log(`load events upcoming`);
		return this.apollo
			.watchQuery<EventDetailsResponse>({
				query: GET_UPCOMING_GIGS,
				variables: {
					today: new Date()
				},
			})
			.valueChanges.pipe(map((result) => result.data.eventDetails));
	}

	GetEventDetails(filterPredicateIn: any): Observable<EventDetail[]> {
		// console.log(`load events with predicate ${filterPredicateIn}`);
		return this.apollo
			.watchQuery<EventDetailsResponse>({
				query: GET_EVENTDETAILS_BYTAG
			})
			.valueChanges.pipe(map((result) => result.data.eventDetails.filter(filterPredicateIn)));
	}

	GetPastEventDetails(): Observable<EventDetailViewModel[]> {
		// console.log(`load events with start_gte ${start_gte}, start_lt ${start_lt}`);
		return this.apollo
			.watchQuery<PastEventDetailsResponse>({
				query: GET_PAST_EVENTS
			})
			.valueChanges.pipe(map((result) => result.data.pastEvents));
	}

	GetUpcomingEventDetails(): Observable<EventDetailViewModel[]> {
		// console.log(`load events with start_gte ${start_gte}, start_lt ${start_lt}`);
		return this.apollo
			.watchQuery<UpcomingEventDetailsResponse>({
				query: GET_UPCOMING_EVENTS
			})
			.valueChanges.pipe(
				map(x => x.data.nextGigPerUpcomingEvent))
	}
}
