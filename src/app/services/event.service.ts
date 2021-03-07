import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {EventDetail, TicketType, TicketTypeInfo} from '../models/event.models';
import {tick} from '@angular/core/testing';

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

const GET_UPCOMING_EVENTS = gql`
    query {
      eventDetails (
        query: {
          AND: [
            {facebookPixelId: ""}
            {OR: [{googleAnalyticsTracker: ""}{googleAnalyticsTracker: "Premiere"}]}
            {start_gte: "2021-01-01T00:00:00Z"}
          ]}){
        _id,
        eventInfos{
          name
          location
          longDescription
          shortDescription
          languageId
        }
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

	static GetPicSqrPathFromEventDetail(eventDetail: EventDetail, usage: string): string {

		if (!eventDetail || !eventDetail.ticketTypes || eventDetail.ticketTypes.length === 0){
			return null;
		}

		let usageTicketTypes: TicketTypeInfo[];

		if (eventDetail.ticketTypes.length === 1) {
			usageTicketTypes = eventDetail.ticketTypes[0].ticketTypeInfos
				.filter(p => p.name.toLowerCase() === usage.toLowerCase() && p.languageId === 1);
		}else{

			for (const ticketType of eventDetail.ticketTypes) {
				usageTicketTypes = ticketType.ticketTypeInfos
					.filter(p => p.name.toLowerCase() === usage.toLowerCase() && p.languageId === 1);
				if (usageTicketTypes && usageTicketTypes.length > 0){
					break;
				}
			}
			// const sortedArray = eventDetail.ticketTypes.slice().sort((a, b) => b.sortOrder - a.sortOrder);
			// const sortedArray = eventDetail.ticketTypes.slice().sort((n1, n2) => {
			// 	if (n1.sortOrder < n2.sortOrder) {
			// 		return 1;
			// 	}
			//
			// 	if (n1.sortOrder > n2.sortOrder) {
			// 		return -1;
			// 	}
			//
			// 	return 0;
			// });
			//
			// if (sortedArray){
			// 	ticketTypeInfos = sortedArray[0].ticketTypeInfos;
			// }
		}
		return usageTicketTypes != null && usageTicketTypes.length > 0 ? usageTicketTypes[0].imageUrl : null;
	}


	static getSortedTicketType(eventDetail: EventDetail): TicketType[] {

		if (!eventDetail || !eventDetail.ticketTypes){
			return null;
		}

		if (eventDetail.ticketTypes.length === 1) {
			return eventDetail.ticketTypes;
		}
	}

	static GetPicBannerPathFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
		&& eventDetail.eventInfos[0]
		&& eventDetail.eventInfos[0].flyerImagePath ?
			eventDetail.eventInfos[0].flyerImagePath : null);
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

	GetUpcomingEventDetails(): Observable<EventDetail[]> {
		return this.apollo
			.watchQuery<GetEventDetailPrototypes>({query: GET_UPCOMING_EVENTS})
			.valueChanges.pipe(map((result) => result.data.eventDetails));
	}

	GetEventDetails(filterPredicateIn: any): Observable<EventDetail[]> {
		return this.apollo
			.watchQuery<GetEventDetailPrototypes>({query: GET_EVENTDETAILS_BYTAG})
			.valueChanges.pipe(map((result) => result.data.eventDetails.filter(filterPredicateIn)));
	}
}
