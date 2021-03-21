import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { EventDetail, EventDetailEventInfo, TicketType, TicketTypeInfo } from '../models/event.models';

const GET_EVENTDETAILS_BYTAG = gql`
  query {
    eventDetails (query: { OR: [{facebookPixelId_ne: ""} {googleAnalyticsTracker_ne: ""}]}){
      _id,
      eventInfos{
        name
        bannerImagePath
        flyerImagePath
        shortDescription
        languageId
      }
      notificationEmail
      facebookPixelId
      googleAnalyticsTracker
      start
      ticketTypes{
        sortOrder
        ticketTypeInfos{
          languageId
          imageUrl
          name
          description
        }
      }
    }
  }
`;

const GET_UPCOMING_EVENTS = gql`
	query GetUpcomingEvents($today: DateTime!){
		eventDetails (
			query: {
				AND: [
								{facebookPixelId: ""}
								{googleAnalyticsTracker: "Premiere"}
								{start_gte: $today}
							]
			})
		{
			_id,
			eventInfos{
				name
				bannerImagePath
				flyerImagePath
				shortDescription
				languageId
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
    }
  }
`;

const GET_UPCOMING_GIGS = gql`
    query GetUpcomingGigs ($today: DateTime!) {
      eventDetails (
        query: {
          AND: [
            {facebookPixelId: ""}
            {OR: [{googleAnalyticsTracker: ""}{googleAnalyticsTracker: "Premiere"}]}
            {start_gte: $today}
          ]}){
        _id,
        eventInfos{
          name
          location
          longDescription
          shortDescription
          languageId
        },
				ticketTypes{
					sortOrder
					price
					currency
					ticketTypeInfos{
						name,
						languageId
					}
				},
        start
      }
    }
`;

interface GetEventInfoById {
	eventDetail: EventDetail;
	notificationEmail: string;
}

interface GetEventDetailPrototypes {
	eventDetails: EventDetail[];
}

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

	static GetPricesStringFromEventDetail(eventDetail: EventDetail): string {

		if (!eventDetail || !eventDetail.ticketTypes || eventDetail.ticketTypes.length === 0) {
			return null;
		}

		let returnArray: string[] = [];

		for (const ticketType of eventDetail.ticketTypes) {

			let name = ticketType.ticketTypeInfos
				.filter(p => p.languageId === 1)[0].name;

			let price = ticketType.price;

			let unit = ticketType.currency;

			let ticketPrice = `${name}: ${unit} ${price}`;
			returnArray.push(ticketPrice);
		}

		return returnArray.join(", ");
	}

	static getSortedTicketType(eventDetail: EventDetail): TicketType[] {

		if (!eventDetail || !eventDetail.ticketTypes) {
			return null;
		}

		if (eventDetail.ticketTypes.length === 1) {
			return eventDetail.ticketTypes;
		}
	}

	static GetBannerImagePathPathFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
			&& eventDetail.eventInfos[0]
			&& eventDetail.eventInfos[0].bannerImagePath ?
			"https://images.weserv.nl/?url=" + eventDetail.eventInfos[0].bannerImagePath + "&w=1140&h=340" : null);
	}

	static GetFlyerImagePathFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
			&& eventDetail.eventInfos[0]
			&& eventDetail.eventInfos[0].flyerImagePath ?
			"https://images.weserv.nl/?url=" + eventDetail.eventInfos[0].flyerImagePath + "&w=196&h=270" : null);
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

	GetEventInfo(id: number): Observable<EventDetail> {
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
		return this.apollo
			.watchQuery<GetEventDetailPrototypes>({
				query: GET_UPCOMING_GIGS,
				variables: {
					today: new Date()
				},
			})
			.valueChanges.pipe(map((result) => result.data.eventDetails));
	}

	GetEventDetails(filterPredicateIn: any): Observable<EventDetail[]> {
		return this.apollo
			.watchQuery<GetEventDetailPrototypes>({
				query: GET_EVENTDETAILS_BYTAG
			})
			.valueChanges.pipe(map((result) => result.data.eventDetails.filter(filterPredicateIn)));
	}

	GetUpcomingEventDetails(): Observable<EventDetail[]> {
		return this.apollo
			.watchQuery<GetEventDetailPrototypes>({
				query: GET_UPCOMING_EVENTS,
				variables: {
					today: new Date()
				},
			})
			.valueChanges.pipe(map((result) => result.data.eventDetails));
	}
}
