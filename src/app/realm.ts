import * as Realm from 'realm-web';
import {environment} from "../environments/environment";

const graphqlUrl = `https://realm.mongodb.com/api/client/v2.0/app/${environment.APP_ID_REALM}/graphql`;

// Connect to your MongoDB Realm app
const app = new Realm.App(environment.APP_ID_REALM);

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken(): Promise<string> {


	if (!app.currentUser)
		// If no user is logged in, log in an anonymous user
	{
		await app.logIn(Realm.Credentials.anonymous()).then(o => {

			sessionStorage.setItem('token', app.currentUser.accessToken)
			return app.currentUser.accessToken;
		});
	} else
		// The logged in user's access token might be stale,
		// Refreshing custom data also refreshes the access token
	{


		await app.currentUser.refreshCustomData().then(z=>{
			sessionStorage.setItem('token', app.currentUser.accessToken)
			return app.currentUser.accessToken;
		});
	}

	// Get a valid access token for the current user

	return app.currentUser.accessToken;
}

export {
	graphqlUrl,
	getValidAccessToken
};
