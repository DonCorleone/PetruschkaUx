import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Press } from '../models/press.models';

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
    .get<GetPressArticlesResponse>('https://petruschka.netlify.app/.netlify/functions/get_press')
    .pipe(map((result) => result.message.documents));
}
