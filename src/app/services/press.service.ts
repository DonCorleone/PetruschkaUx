import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Press {
  _id: string;
  nr: string;
  desc: string;
  source: string;
  date: Date;
  author: string;
  fileExtension: string;
  link: string;
  quote: string;
}

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

  pressArticles$ = this.httpClient.get<GetPressArticlesResponse>('.netlify/functions/get_press')
		.pipe(map((result) => result.message.documents));
}
