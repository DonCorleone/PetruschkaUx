import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import {
  EventDetail,
  EventDetailEventInfo,
  EventDetailsResponse,
  GetEventInfoById,
  TicketPrice,
  TicketType,
  TicketTypeInfo,
  EventDetailViewModel
} from '../models/event.models';
import { HttpClient } from '@angular/common/http';
import { EventLocation } from '../models/location.models';
const GET_ALL_THE_STUFF = gql`
  query getAllTheStuff($cd: String, $tournee: String, $premiere: String) {
    cd: eventDetailsPerUsage(input: $cd) {
      ...eventDetail
    }
    tournee: eventDetailsPerUsage(input: $tournee) {
      ...eventDetail
    }
    premiere: eventDetailsPerUsage(input: $premiere) {
      ...eventDetail
    }
  }

  fragment eventDetail on EventDetail {
    _id
    eventInfos {
      name
      languageId
    }
    facebookPixelId
    googleAnalyticsTracker
    ticketTypes {
      sortOrder
      ticketTypeInfos {
        languageId
        imageUrl
        name
      }
    }
  }
`;

// {
//   "cd": "cd",
//   "tournee": "tournee",
//   "premiere": "premiere"
// }

const GET_EVENTDETAILS_BYTAG = gql`
  query {
    eventDetails(
      sortBy: START_DESC
      query: {
        OR: [
          { googleAnalyticsTracker_in: "CD" }
          { googleAnalyticsTracker_in: "CD|Tournee" }
          { googleAnalyticsTracker_in: "Tournee" }
          { googleAnalyticsTracker_in: "Premiere|Tournee" }
          { googleAnalyticsTracker_in: "Tournee|CD" }
          { googleAnalyticsTracker_in: "Premiere|CD" }
        ]
      }
    ) {
      _id
      eventInfos {
        name
        languageId
      }
      facebookPixelId
      googleAnalyticsTracker
      ticketTypes {
        sortOrder
        ticketTypeInfos {
          languageId
          imageUrl
          name
        }
      }
    }
  }
`;

const GET_EVENTINFO_BYEVENTID = gql`
  query GetEventByGroupId($eventId: Int!) {
    eventDetail(query: { _id: $eventId }) {
      eventInfos {
        name
        languageId
        shortDescription
        longDescription
        address
        location
        bannerImagePath
        artists
        url
      }
      notificationEmail
      facebookPixelId
      googleAnalyticsTracker
      start
      ticketTypes {
        sortOrder
        preSaleStart
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

interface MessageEventDetail {
	documents: EventDetail[];
}

interface MessageEventDetailViewModel {
  _id: string;
  documents: EventDetailViewModel[];
}

interface UpComingEventsResponse {
	message: MessageEventDetail;
}

interface PastEventDetailsResponse {
  message: MessageEventDetailViewModel;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private apollo: Apollo, private httpClient: HttpClient) {}

  static GetEventInfoFromEventDetail(eventDetail: EventDetail): EventDetailEventInfo {
    if (!eventDetail || !eventDetail.eventInfos || eventDetail.eventInfos?.length === 0) {
      return null;
    }

    return eventDetail.eventInfos?.filter((p) => p.languageId === 0)?.length > 0
      ? eventDetail.eventInfos?.filter((p) => p.languageId === 0)[0]
      : null;
  }

  static GetTicketTypeInfoFromEventDetail(eventDetail: EventDetail, usage: string): TicketTypeInfo {
    if (!eventDetail || !eventDetail.ticketTypes || eventDetail.ticketTypes.length === 0) {
      return null;
    }

    let usageTicketTypes: TicketTypeInfo[];

    if (eventDetail.ticketTypes.length === 1) {
      usageTicketTypes = eventDetail.ticketTypes[0].ticketTypeInfos?.filter(
        (p) => p.name.toLowerCase() === usage.toLowerCase() && p.languageId === 0
      );
    } else {
      for (const ticketType of eventDetail.ticketTypes) {
        usageTicketTypes = ticketType.ticketTypeInfos?.filter(
          (p) => p.name.toLowerCase() === usage.toLowerCase() && p.languageId === 0
        );
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
      let name = ticketType.ticketTypeInfos?.filter((p) => p.languageId === 0)[0].name;

      let price = ticketType.price;

      let unit = ticketType.currency;

      let ticketPrice: TicketPrice = {
        name: name,
        currency: unit,
        price: price,
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
    return eventDetail &&
      eventDetail.eventInfos &&
      eventDetail.eventInfos[0] &&
      eventDetail.eventInfos[0].bannerImagePath
      ? 'https://images.weserv.nl/?url=' + eventDetail.eventInfos[0].bannerImagePath + '&w=1137&h=339'
      : null;
  }

  static GetFlyerImagePathFromEventDetail(eventDetail: EventDetail): string {
    return eventDetail &&
      eventDetail.eventInfos &&
      eventDetail.eventInfos[0] &&
      eventDetail.eventInfos[0].flyerImagePath
      ? 'https://images.weserv.nl/?url=' + eventDetail.eventInfos[0].flyerImagePath + '&w=195&h=269'
      : null;
  }

  static GetShortDescFromEventDetail(eventDetail: EventDetail): string {
    return eventDetail && eventDetail.eventInfos?.find((p) => p.languageId === 0)?.shortDescription;
  }

  static GetNameFromEventDetail(eventDetail: EventDetail): string {
    return eventDetail &&
      eventDetail.eventInfos &&
      eventDetail.eventInfos[0] &&
      eventDetail.eventInfos &&
      eventDetail.eventInfos[0].name
      ? eventDetail.eventInfos && eventDetail.eventInfos[0].name
      : null;
  }

  static GetLongDescriptionFromEventDetail(eventDetail: EventDetail): string {
    return eventDetail && eventDetail.eventInfos?.find((p) => p.languageId === 0)?.longDescription;
  }

  static GetImportantNotesFromEventDetail(eventDetail: EventDetail): string {
    return eventDetail && eventDetail.eventInfos?.find((p) => p.languageId === 0)?.importantNotes;
  }

  static GetLocationFromEventDetail(eventDetail: EventDetail): string {
    return eventDetail &&
      eventDetail.eventInfos &&
      eventDetail.eventInfos[0] &&
      eventDetail.eventInfos &&
      eventDetail.eventInfos[0].location
      ? eventDetail.eventInfos && eventDetail.eventInfos[0].location
      : null;
  }

  static GetStartFromEventDetail(eventDetail: EventDetail): Date {
    return eventDetail && eventDetail.start ? eventDetail.start : null;
  }

  GetEventDetail(id: number): Observable<EventDetail> {
    // console.log(`load event with Item ${id}`);
    return this.apollo
      .query<GetEventInfoById>({
        query: GET_EVENTINFO_BYEVENTID,
        variables: {
          eventId: id,
        },
      })
      .pipe(map((result) => result.data.eventDetail));
  }

  upcomingGigs$ = this.httpClient
		.get<UpComingEventsResponse>('.netlify/functions/get_events?collection=UpcomingEventsActive')
		.pipe(map((result) => result.message.documents));

  GetEventDetails(filterPredicateIn: any): Observable<EventDetail[]> {
    // console.log(`load events with predicate ${filterPredicateIn}`);
    return this.apollo
      .query<EventDetailsResponse>({
        query: GET_EVENTDETAILS_BYTAG,
      })
      .pipe(map((result) => result.data.eventDetails.filter(filterPredicateIn)));
  }

  pastEventDetails$ = this.httpClient
    .get<PastEventDetailsResponse>('.netlify/functions/get_events?collection=PastEventsWithId')
    .pipe(map((result) => result.message.documents));

  upcomingEventDetails$ = this.httpClient
		.get<PastEventDetailsResponse>('.netlify/functions/get_events?collection=UpcomingPremieres')
		.pipe(map((result) => result.message.documents));
}
