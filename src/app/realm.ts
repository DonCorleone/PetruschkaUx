import * as Realm from 'realm-web';
import {environment} from "../environments/environment";
import jwtDecode from "jwt-decode";

const graphqlUrl = `https://realm.mongodb.com/api/client/v2.0/app/${environment.APP_ID_REALM}/graphql`;

// Connect to your MongoDB Realm app
const app = new Realm.App(environment.APP_ID_REALM);


// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken(): Promise<string> {

	console.log('app.currentUser');

	let x: string = '';
	if (!app.currentUser || tokenExpired(app.currentUser))
		// If no user is logged in, log in an anonymous user
	{

			x = await app.logIn(Realm.Credentials.anonymous()).then(o => {

			console.log('Realm.Credentials.anonymous');
		//	localStorage.setItem('token', app.currentUser.accessToken)
			return o.accessToken;
		});
	} else
		// The logged in user's access token might be stale,
		// Refreshing custom data also refreshes the access token
	{


		x = await app.currentUser.refreshCustomData().then(z=>{
			console.log('app.currentUser.refreshCustomData():' + JSON.stringify(z))
		//	localStorage.setItem('token', app.currentUser.accessToken)
			return app.currentUser.accessToken;
		});
	}

	// Get a valid access token for the current user

	return x;
}

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessTokenMongoDB() {
	// Guarantee that there's a logged in user with a valid access token
	if (!app.currentUser) {
		// If no user is logged in, log in an anonymous user. The logged in user will have a valid
		// access token.
		await app.logIn(Realm.Credentials.anonymous());
	} else {
		// An already logged in user's access token might be stale. To guarantee that the token is
		// valid, we refresh the user's custom data which also refreshes their access token.
		await app.currentUser.refreshCustomData();
	}
	localStorage.setItem('token', app.currentUser.accessToken);
	return app.currentUser.accessToken;
}

function tokenExpired(currentUser:any):boolean{
	if (currentUser?.accessToken) {
		console.log('token found at realm');
		const decoded = jwtDecode(currentUser.accessToken);
		const expDate = +decoded['exp'];
		if (expDate < Date.now() / 1000) {
			localStorage.removeItem('token');
			currentUser.accessToken = null;
			console.log('expired at realm');
			return true;
		}else{
			console.log('valid at realm');
			return false;
		}
	}
}
export {
	graphqlUrl,
	getValidAccessToken,
	getValidAccessTokenMongoDB
};
