import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';

import { HttpLink } from 'apollo-angular/http';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageModalComponent } from './components/gallery/image-modal/image-modal.component';
import { InfoComponent } from './components/info/info-item/info-item.component';
import { TicketItemComponent } from './components/ticket/ticket-item/ticket-item.component';
import { TicketModalComponent } from './components/ticket/ticket-modal/ticket-modal.component';
import { AboutModule } from './modules/about/about.module';
import * as realm from './realm';
import { getValidAccessToken } from './realm';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';

const uri = realm.graphqlUrl;

export function createApollo3(httpLink: HttpLink) {
	const basic = setContext((operation, context) => ({
		headers: {
			Accept: 'charset=utf-8'
		}
	}));

	const auth = setContext(async (_, {headers}) => {
		const token = await getValidAccessToken();
		if (token === null) {
			return {};
		} else {
			return {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};
		}
	});

	const link = ApolloLink.from([basic, auth, httpLink.create({uri})]);
	const cache = new InMemoryCache();

	return {
		link,
		cache
	};
}

@NgModule({
	declarations: [AppComponent, ScrollSpyDirective, ImageModalComponent, TicketModalComponent, TicketItemComponent],
	imports: [AboutModule, BrowserModule, AppRoutingModule, HttpClientModule, ScullyLibModule, BrowserAnimationsModule],
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
export class AppModule {
}
