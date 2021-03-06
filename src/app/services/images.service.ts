import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
				'Authorization': 'Basic ' + btoa(process.env.API_KEY_IMAGE4IO + ':' + process.env.API_SECRET_IMAGE4IO)
			})
		};

		return this.http.get<Image4Response>(process.env.API_URL_IMAGE4IO + `/listFolder?path=/${albumHash}/`, httpOptions);
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


