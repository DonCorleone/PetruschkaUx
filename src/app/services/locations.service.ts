import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EventLocation} from '../models/location.models';

interface GetEventLocationByName {
	eventLocation: EventLocation;
}

const GET_LOCATION_BY_NAME = gql`
  query GetLocationByName($name: String!) {
    eventLocation:location(query:{name:$name}){
      name
      street
      postalCode
      city
      directions
      info
    }
  }
`;

@Injectable({
	providedIn: 'root'
})
export class LocationsService {

	constructor(private  apollo: Apollo) {
	}

	GetEventLocation(nameIn: string): Observable<EventLocation> {
		// console.log(`GetEventLocation`);
		return this.apollo
			.query<GetEventLocationByName>({
				query: GET_LOCATION_BY_NAME,
				variables: {
					name: nameIn
				},
			})
			.pipe(map((result) => result.data.eventLocation));
	}
}

