import * as Realm from 'realm-web';
import { environment } from '../environments/environment';
import jwt_decode from 'jwt-decode';

const graphqlUrl = `https://realm.mongodb.com/api/client/v2.0/app/${environment.APP_ID_REALM}/graphql`;

// Connect to your MongoDB Realm app
const app = new Realm.App(environment.APP_ID_REALM);
const sessionKey = 'exp';

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken(): Promise<string> {
	let token = null;

	if (!app.currentUser) {

		// NO current User

		await app.logIn(Realm.Credentials.anonymous()).then(o => {
		//	setToken(app.currentUser.accessToken);
			token = app.currentUser.accessToken;
		});
	} else {

		// The logged in user's access token might be stale,
		// Refreshing custom data also refreshes the access token

		token = app.currentUser.accessToken
		const decoded = jwt_decode(token);
		const expDate = +decoded['exp'];
		if (expDate < Date.now() / 1000) {
			await app.currentUser.refreshCustomData().then(z => {
				//setToken(app.currentUser.accessToken);
				token = app.currentUser.accessToken;
			});
		}

/*    let storageKey =
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
		removeExpiredTokens(storageKey);*/

/*		const exp = +sessionStorage.getItem(sessionKey);
		if (!exp || exp < Date.now() / 1000) {
			await app.currentUser.refreshCustomData().then(z => {
				setToken(app.currentUser.accessToken);
				token = app.currentUser.accessToken;
			});
		} else {
			token = app.currentUser.accessToken;
		}*/
	}
	// Get a valid access token for the current user
	return token;
  }



function setToken(token: any) {
	const decoded = jwt_decode(token) as any;
	sessionStorage.setItem(sessionKey, decoded.exp);
}

function removeExpiredTokens(storageKey: string) {
	let storedToken = localStorage.getItem(storageKey);
	if (storedToken) {
		console.log(`found ${storageKey}`);
		const decoded = jwt_decode(storedToken);
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
