import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.custom';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  listAssets(path: string): Observable<Netlifile[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${environment.API_KEY_NETLIFY}`,
      }),
    };

    return this.http
      .get<Netlifile[]>('https://api.netlify.com/api/v1' + `/sites/${environment.SITE_ID}/files/`, httpOptions)
      .pipe(map((p) => p.filter((f) => f.path.startsWith(path))));
  }
}

export interface Netlifile {
  id: string;
  path: string;
  sha: string;
  mime_type: string;
  size: number;
  site_id: string;
  deploy_id: string;
  url?: string;
}
