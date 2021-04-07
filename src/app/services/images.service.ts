import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient) {

	}

	getAlbum(albumHash:String):Observable<Image4Response> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'Basic ' + ')
			})
		};

		return this.http.get<Image4Response>(`https://api.image4.io/v0.1/listFolder?path=/${albumHash}/`, httpOptions);
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


