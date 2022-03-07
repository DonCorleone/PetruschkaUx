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
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ImageModalComponent } from './components/gallery/image-modal/image-modal.component';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';
import { TicketModalComponent } from './components/ticket/ticket-modal/ticket-modal.component';
import { TicketItemComponent } from './components/ticket/ticket-item/ticket-item.component';
import { AboutModule } from './modules/about/about.module';
import { createApollo, GraphQLModule } from './modules/graphql/graphql.module';

@NgModule({
  declarations: [AppComponent, ScrollSpyDirective, ImageModalComponent, TicketModalComponent, TicketItemComponent],
  imports: [
    GraphQLModule,
    AboutModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScullyLibModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [InfoComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
