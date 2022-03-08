import * as Realm from 'realm-web';
import {environment} from "../environments/environment";
import jwtDecode from "jwt-decode";

const graphqlUrl = `https://realm.mongodb.com/api/client/v2.0/app/${environment.APP_ID_REALM}/graphql`;

// Connect to your MongoDB Realm app
const app = new Realm.App(environment.APP_ID_REALM);


// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken(): Promise<string> {

	console.log('app.currentUser: ' + JSON.stringify(app));

	if (!app.currentUser || tokenExpired(app.currentUser))
		// If no user is logged in, log in an anonymous user
	{
		await app.logIn(Realm.Credentials.anonymous()).then(o => {

			console.log('Realm.Credentials.anonymous():' + JSON.stringify(o));
			localStorage.setItem('token', app.currentUser.accessToken)
			return o.accessToken;
		});
	} else
		// The logged in user's access token might be stale,
		// Refreshing custom data also refreshes the access token
	{


		await app.currentUser.refreshCustomData().then(z=>{
			console.log('app.currentUser.refreshCustomData():' + JSON.stringify(z))
			localStorage.setItem('token', app.currentUser.accessToken)
			return app.currentUser.accessToken;
		});
	}

	// Get a valid access token for the current user

	return app.currentUser.accessToken;
}

function tokenExpired(currentUser:any):boolean{
	if (currentUser?.accessToken) {
		console.log('token found');
		const decoded = jwtDecode(currentUser.accessToken);
		const expDate = +decoded['exp'];
		if (expDate < Date.now() / 1000) {
			localStorage.removeItem('token')
			currentUser.accessToken = null;
			console.log('expired');
			return true;
		}else{
			console.log('valid');
			return false;
		}
	}
}
export {
	graphqlUrl,
	getValidAccessToken
};
