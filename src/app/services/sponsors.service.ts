import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { Sponsor, SponsorsData, SponsorsResponse } from '../models/sponsors.models';



const GET_SPONSORING = gql`
query {
	sponsors  {
		name
		url
		image
		events{
			event
			share
		}
	}
}
`;
@Injectable({
  providedIn: 'root'
})

export class SponsorsService {

	constructor(private apollo: Apollo) {
	}

	GetSponsors(event:String): Observable<Sponsor[]> {
		return this.apollo
			.watchQuery<SponsorsData>({
				query: GET_SPONSORING
			})
			.valueChanges.pipe(
				// tap((result) => // console.log(JSON.stringify(result.data.sponsors))),
				map(
					(result) => {
						return event !== ""
							? result.data.sponsors
								.filter(sponsor => sponsor.events
									.find(eventOccurance => eventOccurance.event === event))
								.sort((o1, o2) =>
									o2.events.find(eventOccurance => eventOccurance.event === event).share -
									o1.events.find(eventOccurance => eventOccurance.event === event).share)
							: result.data.sponsors
							.filter(sponsor => sponsor.events
								.find(eventOccurance => eventOccurance.event !== ''))
							.sort((o1, o2) =>
							(o2.events.reduce(function(prev, current) {
								return (prev.share > current.share) ? prev : current}).share) -
							(o1.events.reduce(function(prev, current) {
								return (prev.share > current.share) ? prev : current}).share)
						)
					}
				)
			)
		};
	}

