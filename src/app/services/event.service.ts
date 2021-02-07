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
      }
      notificationEmail
      facebookPixelId
      googleAnalyticsTracker
      start
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

  constructor(private apollo: Apollo) { }
}
