import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Press } from '../models/press.models';
import { environment } from '../../environments/environment.custom';
import { BaseService } from './base.service';

interface Message {
  documents: Press[];
}

interface GetPressArticlesResponse {
  message: Message;
}

@Injectable({
  providedIn: 'root',
})
export class PressService extends BaseService {
  pressArticles$ = this.httpClient
    .get<GetPressArticlesResponse>(this.getUrl('get_press'))
    .pipe(map((result) => result.message.documents));
}
