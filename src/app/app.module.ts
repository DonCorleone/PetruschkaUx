import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';

import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';

import { HttpLink } from 'apollo-angular/http';

import * as realm from './realm';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InfoComponent } from './components/info/info-item/info-item.component';
// import { ScullyLibModule } from '@scullyio/ng-lib';
import { ImageModalComponent } from './components/gallery/image-modal/image-modal.component';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';
import { TicketModalComponent } from './components/ticket/ticket-modal/ticket-modal.component';
import { TicketItemComponent } from './components/ticket/ticket-item/ticket-item.component';
import { AboutModule } from './modules/about/about.module';
import { setContext } from '@apollo/client/link/context';
import { getValidAccessToken } from './realm';
const uri = realm.graphqlUrl;

export function createApollo2(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
    }),
    cache: new InMemoryCache(),
  };
}

export function createApollo3(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  declarations: [AppComponent, ScrollSpyDirective, ImageModalComponent, TicketModalComponent, TicketItemComponent],
  imports: [AboutModule, BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule], // ScullyLibModule
  entryComponents: [InfoComponent],
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo3,
      deps: [HttpLink],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
