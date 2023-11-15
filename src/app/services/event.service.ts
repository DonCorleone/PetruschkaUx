import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  EventDetail,
  EventDetailEventInfo,
  TicketPrice,
  TicketType,
  TicketTypeInfo,
  EventDetailViewModel,
} from '../models/event.models';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment.custom";

export interface GetEventInfoById {ß
  message: MessageEventDetail;
}

interface MessageEventDetail {
  documents: EventDetail[];
}

interface MessageEventDetailViewModel {
  _id: string;
  documents: EventDetailViewModel[];
}

interface EventDetailsResponse {
  message: MessageEventDetail;
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
  constructor(private httpClient: HttpClient) {}

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
      const ticketTypeInfo = ticketType.ticketTypeInfos?.filter((p) => p.languageId === 0)[0];
      let ticketPrice: TicketPrice = {
        name: ticketTypeInfo?.name,
        currency: ticketType.currency,
        price: ticketType.price,
        description: ticketTypeInfo?.description,
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

  static GetFlyerImagePathFromEventDetail(eventDetail: EventDetail): string {
    return eventDetail &&
      eventDetail.eventInfos &&
      eventDetail.eventInfos[0] &&
      eventDetail.eventInfos[0].flyerImagePath
      ? eventDetail.eventInfos[0].flyerImagePath + '?nf_resize=fit&w=195'
      : null;
  }

  GetEventDetail(id: number): Observable<EventDetail> {
    return this.httpClient
      .get<GetEventInfoById>(`https://${environment.BRANCH}--${environment.SITE_NAME}.netlify.app/.netlify/functions/get_eventInfos?eventid=${id}`)
      .pipe(map((result) => result.message.documents.find((p) => p._id === id)));
  }

  upcomingGigs$ = this.httpClient
    .get<UpComingEventsResponse>(`https://${environment.BRANCH}--${environment.SITE_NAME}.netlify.app/.netlify/functions/get_events?collection=UpcomingEventsActive`)
    .pipe(map((result) => result.message.documents));

  GetEventDetails(filterPredicateIn: any): Observable<EventDetail[]> {
    return this.httpClient
      .get<EventDetailsResponse>(`https://${environment.BRANCH}--${environment.SITE_NAME}.netlify.app/.netlify/functions/get_events?collection=EventDetailsTaggedUsage`)
      .pipe(map((result) => result.message.documents.filter(filterPredicateIn)));
  }

  pastEventDetails$ = this.httpClient
    .get<PastEventDetailsResponse>(`https://${environment.BRANCH}--${environment.SITE_NAME}.netlify.app/.netlify/functions/get_events?collection=PastEventsWithId`)
    .pipe(map((result) => result.message.documents));

  upcomingEventDetails$ = this.httpClient
    .get<PastEventDetailsResponse>(`https://${environment.BRANCH}--${environment.SITE_NAME}.netlify.app/.netlify/functions/get_events?collection=UpcomingPremieres`)
    .pipe(map((result) => result.message.documents));
}
