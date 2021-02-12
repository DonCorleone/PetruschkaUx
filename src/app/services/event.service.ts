import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EventDetail } from '../models/event.models';
import { EmptyObject } from 'apollo-angular/types';

const GET_EVENTDETAILS_BYTAG = gql`
  query {
    eventDetails (query: { OR: [{facebookPixelId_ne: ""} {googleAnalyticsTracker_ne: ""}]}){
      _id,
      eventInfos{
        name
        bannerImagePath
        flyerImagePath
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
    eventDetails(query:{_id:$eventId}){
      eventInfos{
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

interface GetEventInfoById {
  eventDetails: EventDetail[];
  notificationEmail: String;
}

interface GetEventDetailPrototypes {
  eventDetails: EventDetail[];
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apollo: Apollo) { }

  GetEventInfo(id: number) : QueryRef<GetEventInfoById, EmptyObject> {
    return this.apollo
    .watchQuery<GetEventInfoById>({
      query: GET_EVENTINFO_BYEVENTID,
      variables: {
        eventId: id,
      },
    });
  }

  GetEventDetails(filterPredicateIn: any): Observable<EventDetail[]>{
    return this.apollo
      .watchQuery<GetEventDetailPrototypes>({query: GET_EVENTDETAILS_BYTAG})
      .valueChanges.pipe(map((result) => result.data.eventDetails.filter(filterPredicateIn)));
    }

  static GetPicSqrPathFromEventDetail(eventDetail: EventDetail): string{
    return (eventDetail
      && eventDetail.ticketTypes[0]
      && eventDetail.ticketTypes[0].ticketTypeInfos[0] ?
      eventDetail.ticketTypes[0].ticketTypeInfos[0].imageUrl : null);
  }

  static GetPicBannerPathFromEventDetail(eventDetail: EventDetail): string{
    return (eventDetail
      && eventDetail.eventInfos[0]
      && eventDetail.eventInfos[0].flyerImagePath ?
      eventDetail.eventInfos[0].flyerImagePath : null);
  }
}
