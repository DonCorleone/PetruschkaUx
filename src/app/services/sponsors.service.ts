import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sponsor } from '../models/sponsors.models';
import { environment } from 'src/environments/environment.custom';
import { BaseService } from './base.service';

interface Message {
  documents: Sponsor[];
}

interface SponsorsResponse {
  message: Message;
}

@Injectable({
  providedIn: 'root',
})
export class SponsorsService extends BaseService {
  GetSponsors(event: String): Observable<Sponsor[]> {
    return this.httpClient.get<SponsorsResponse>(this.getUrl('get_sponsors')).pipe(
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
