import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient) {
	//	require('dotenv').config();
	}

	getAlbum(albumHash:String):Observable<Image4Response> {

		const apiKey = ''; //
		const apiSecret = ''; //
		const apiUrl = ''; //
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'Basic ' + btoa(apiKey + ':' + apiSecret)
			})
		};

		return this.http.get<Image4Response>(apiUrl + `/listFolder?path=/${albumHash}/`, httpOptions);
	}
}


    export interface File {
        folder: string;
        orginal_name: string;
        name: string;
        size: number;
        format: string;
        width: number;
        height: number;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Image4Response {
        folders: any[];
        files: File[];
    }


