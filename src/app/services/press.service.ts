import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Press {
		author: string;
		date: Date;
		desc: string;
		fileExtension: string;
		link: string;
		nr: string;
		quote: string;
		source: string;
}

export interface Articles {
		presses: Press[];
}

export interface GetPressArticlesResponse {
		data: Articles;
}

const GET_PRESS_ARTICLES = gql`
	query GetPressArticles {
		presses {
			quote
      fileExtension
      link
			nr
			desc
			author
			source
			date
		}
	}
`;

``

@Injectable({
  providedIn: 'root'
})
export class PressService {

	constructor(private apollo: Apollo) {
	}

	GetPressArticles(): Observable<Press[]> {

		return this.apollo
			.watchQuery<Articles>({
				query: GET_PRESS_ARTICLES
			})
			.valueChanges.pipe(
				map((result) => result.data.presses));
	}
}
