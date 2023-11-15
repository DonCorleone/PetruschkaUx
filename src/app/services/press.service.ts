import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Press } from '../models/press.models';
import {environment} from "../../environments/environment.custom";

interface Message {
  documents: Press[];
}

interface GetPressArticlesResponse {
  message: Message;
}

@Injectable({
  providedIn: 'root',
})
export class PressService {
  constructor(private httpClient: HttpClient) {}

  pressArticles$ = this.httpClient
    .get<GetPressArticlesResponse>(`https://${environment.BRANCH}--${environment.SITE_NAME}.netlify.app/.netlify/functions/get_press`)
    .pipe(map((result) => result.message.documents));
}
