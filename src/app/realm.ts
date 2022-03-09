import * as Realm from 'realm-web';
import { environment } from '../environments/environment';
import jwt_decode from 'jwt-decode';

const graphqlUrl = `https://realm.mongodb.com/api/client/v2.0/app/${environment.APP_ID_REALM}/graphql`;
const sessionKey = 'exp';

// Connect to your MongoDB Realm app
const app = new Realm.App(environment.APP_ID_REALM);

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken(): Promise<string> {

	let token = null;

	if (!app.currentUser) {
		await app.logIn(Realm.Credentials.anonymous()).then(o => {
			setToken(app.currentUser.accessToken);
			token = app.currentUser.accessToken;
		});
	} else {
		const exp = +sessionStorage.getItem(sessionKey);
		if (!exp || exp < Date.now() / 1000) {
			await app.currentUser.refreshCustomData().then(z => {
				setToken(app.currentUser.accessToken);
				token = app.currentUser.accessToken;
			});
		} else {
			token = app.currentUser.accessToken;
		}
	}

	return token;
}

function setToken(token: any) {
	const decoded = jwt_decode(token) as any;
	sessionStorage.setItem(sessionKey, decoded.exp);
}

export {
	graphqlUrl,
	getValidAccessToken
};
