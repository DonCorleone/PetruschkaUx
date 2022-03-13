import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink, ApolloClientOptions } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import * as realm from '../../realm';
import jwtDecode from 'jwt-decode';

const uri = realm.graphqlUrl;

export function createApolloMongoDb(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
    }),
    cache: new InMemoryCache(),
  };
}

export function createApollo(httpLink: HttpLink) {
  /*	const auth = setContext(async(_, { headers }) => {
		// Grab token if there is one in storage or hasn't expired
		let token = await realm.getValidAccessTokenMongoDB();

		if (!token) {
			// An observable to fetch a new token
			// Converted .toPromise()
			await realm.acquireToken().toPromise();

			// Set new token to the response (adal puts the new token in storage when fetched)
			token = realm.getCachedAccessToken();
		}
		// Return the headers as usual
		return {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	});*/

  /*	const auth2 = setContext((operation, context) => {
		const token = localStorage.getItem('token');
		if (token) {
			console.log('token found at graphql-module');
			const decoded = jwtDecode(token);
			const expDate = +decoded['exp'];
			if (expDate < Date.now() / 1000) {
				localStorage.removeItem('token');
				console.log('expired at graphql-module');
			}else{
				console.log('valid at graphql-module');
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
	});*/

  /*	const auth3 = setContext((operation, context) => {
		new ApolloClient({
			link: new HttpLink({
				uri: `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
				// We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
				// The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
				// access token before sending the request.
				fetch: async (uri, options) => {
					const accessToken = await getValidAccessToken();
					options.headers.Authorization = `Bearer ${accessToken}`;
					return fetch(uri, options);
				},
			}),
	});*/

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    realm.getValidAccessToken().then((token) => {
      if (token === null) {
        return {};
      } else {
        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
    });
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
