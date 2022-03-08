import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache,ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import * as realm from "../../realm";
import jwtDecode from "jwt-decode";

const uri = realm.graphqlUrl;

export function createApollo(httpLink: HttpLink) {

/*	const auth = setContext(async(_, { headers }) => {
		// Grab token if there is one in storage or hasn't expired
		let token = this.auth.getCachedAccessToken();

		if (!token) {
			// An observable to fetch a new token
			// Converted .toPromise()
			await this.auth.acquireToken().toPromise();

			// Set new token to the response (adal puts the new token in storage when fetched)
			token = this.auth.getCachedAccessToken();
		}
		// Return the headers as usual
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	});*/

	const auth2 = setContext((operation, context) => {
		const token = localStorage.getItem('token');
		if (token) {
			console.log('token found @ graphql-module');
			const decoded = jwtDecode(token);
			const expDate = +decoded['exp'];
			if (expDate < Date.now() / 1000) {
				localStorage.removeItem('token')
				console.log('expired @ graphql-module');
			}else{
				console.log('valid@ graphql-module');
			}
		}

		if (token === null) {
			return {};
		} else {
			return {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};
		}
	});

	const link = ApolloLink.from([auth2, httpLink.create({ uri })]);
	const cache = new InMemoryCache();

	return {
		link,
		cache
	}
}

@NgModule({
	exports: [
		HttpClientModule,
		ApolloModule,
	],
	providers: [{
		provide: APOLLO_OPTIONS,
		useFactory: createApollo,
		deps: [HttpLink]
	}]
})
export class GraphQLModule {}
