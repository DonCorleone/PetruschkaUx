import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventLocation {
  _id: string;
  city: string;
  directions: string;
  info: string;
  name: string;
  postalCode: string;
  street: string;
}

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
      .pipe(map((result) => result.message.documents.find(p => p.name == nameIn)));
  }
}
