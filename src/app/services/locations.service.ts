import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventLocation } from '../models/location.models';

interface Message {
  documents: EventLocation[];
}

interface GetEventLocationResponse {
  message: Message;
}

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private httpClient: HttpClient) {}

  GetEventLocation(nameIn: string): Observable<EventLocation> {
    return this.httpClient
      .get<GetEventLocationResponse>(`.netlify/functions/get_location?location=${nameIn}`)
      .pipe(map((result) => result.message.documents.find((p) => p.name == nameIn)));
  }
}
