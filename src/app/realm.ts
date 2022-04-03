import * as Realm from 'realm-web';
import { environment } from '../environments/environment.custom';
import jwtDecode from 'jwt-decode';

const graphqlUrl = `https://realm.mongodb.com/api/client/v2.0/app/${environment.APP_ID_REALM}/graphql`;

// Connect to your MongoDB Realm app
const app = new Realm.App(environment.APP_ID_REALM);

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken(): Promise<string> {
	if (!app.currentUser) {
		// If no user is logged in, log in an anonymous user
		await app.logIn(Realm.Credentials.anonymous()).then((o) => {
			localStorage.setItem('token', app.currentUser.accessToken);
			return app.currentUser.accessToken;
		});
	}
		// The logged in user's access token might be stale,
	// Refreshing custom data also refreshes the access token
	else {
		let storageKey =
			app.storage['storage']['keyPart'] +
			':' +
			app.storage['keyPart'] +
			':' +
			app.currentUser['storage']['keyPart'] +
			':' +
			'accessToken';
		removeExpiredTokens(storageKey);

		storageKey =
			app.storage['storage']['keyPart'] +
			':' +
			app.storage['keyPart'] +
			':' +
			app.currentUser['storage']['keyPart'] +
			':' +
			'refreshToken';
		removeExpiredTokens(storageKey);

		await app.currentUser.refreshCustomData().then((z) => {
			localStorage.setItem('token', app.currentUser.accessToken);
			return app.currentUser.accessToken;
		});
	}

	// Get a valid access token for the current user

	return app.currentUser.accessToken;
}

function removeExpiredTokens(storageKey: string) {
	let storedToken = localStorage.getItem(storageKey);
	if (storedToken) {
		console.log(`found ${storageKey}`);
		const decoded = jwtDecode(storedToken);
		const expDate = +decoded['exp'];
		if (expDate < Date.now() / 1000) {
			localStorage.removeItem(storageKey);
			console.log(`expired - removed ${storageKey}`);
		} else {
			console.log('valid');
		}
	}
}

export { graphqlUrl, getValidAccessToken };
