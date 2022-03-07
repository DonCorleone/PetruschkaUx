import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import * as realm from '../realm';
import jwtDecode from "jwt-decode";

@Injectable({
	providedIn: 'root'
})
export class RealmAuthGuard implements CanActivate {
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return realm.getValidAccessToken().then(accessToken => {
			if (accessToken) {
				console.log('token found');
				const decoded = jwtDecode(accessToken);
				const expDate = +decoded['exp'];
				if (expDate < Date.now() / 1000) {
					localStorage.removeItem('token')
					accessToken = null;
					console.log('expired');
				}else{
					console.log('valid');
				}
			}

			return accessToken ? true : false;
		});
	}
}
