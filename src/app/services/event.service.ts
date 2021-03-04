import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {EventDetail} from '../models/event.models';

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
        ticketTypeInfos{
          imageUrl
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

	static GetPicSqrPathFromEventDetail(eventDetail: EventDetail): string {
		return (eventDetail
		&& eventDetail.ticketTypes[0]
		&& eventDetail.ticketTypes[0].ticketTypeInfos[0] ?
			eventDetail.ticketTypes[0].ticketTypeInfos[0].imageUrl : null);
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
