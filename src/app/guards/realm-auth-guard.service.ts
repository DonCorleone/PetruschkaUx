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
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Promise<boolean> | boolean {

		return realm.getValidAccessTokenMongoDB().then(accessToken => {
			return accessToken ? true : false;
		});
	}
}
