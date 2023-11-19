import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.custom';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(protected httpClient: HttpClient) {}

  getUrl(controller: string): string {
    let url = environment.URL;
    if (environment.CONTEXT !== 'local') {
      url = `https://${environment.BRANCH}--${environment.SITE_NAME}.netlify.app`;
    }
    return `${url}/.netlify/functions/${controller}`;
  }
}
