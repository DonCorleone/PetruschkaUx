import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  event: string;
  share: number;
}

export interface Sponsor {
  events: Event[];
  image: string;
  name: string;
  url: string;
}

interface Message {
  documents: Sponsor[];
}

interface SponsorsResponse {
  message: Message;
}

@Injectable({
  providedIn: 'root',
})
export class SponsorsService {
  constructor(private httpClient: HttpClient) {}

  GetSponsors(event: String): Observable<Sponsor[]> {
    return this.httpClient.get<SponsorsResponse>('/.netlify/functions/get_sponsors').pipe(
      map((result) => {
        return event !== ''
          ? result.message.documents
              .filter((sponsor) => sponsor.events.find((eventOccurance) => eventOccurance.event === event))
              .sort(
                (o1, o2) =>
                  o2.events.find((eventOccurance) => eventOccurance.event === event).share -
                  o1.events.find((eventOccurance) => eventOccurance.event === event).share
              )
          : result.message.documents
              .filter((sponsor) => sponsor.events.find((eventOccurance) => eventOccurance.event !== ''))
              .sort(
                (o1, o2) =>
                  o2.events.reduce(function (prev, current) {
                    return prev.share > current.share ? prev : current;
                  }).share -
                  o1.events.reduce(function (prev, current) {
                    return prev.share > current.share ? prev : current;
                  }).share
              );
      })
    );
  }
}
