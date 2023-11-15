import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventLocation, LocationIdName } from '../models/location.models';

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

  GetEventLocation(locationIdName: LocationIdName): Observable<EventLocation> {
    if (locationIdName?.ef_id) {
      return this.httpClient
        .get<GetEventLocationResponse>(`${process.env['URL']}/.netlify/functions/get_location?ef_id=${locationIdName?.ef_id}`)
        .pipe(map((result) => result.message.documents.find((p) => p.ef_id == locationIdName?.ef_id)));
    } else {
      return this.httpClient
        .get<GetEventLocationResponse>(`${process.env['URL']}/.netlify/functions/get_location?name=${locationIdName?.name}`)
        .pipe(map((result) => result.message.documents.find((p) => p.name == locationIdName?.name)));
    }
  }
}
