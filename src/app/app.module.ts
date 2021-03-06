import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScrollSpyDirective} from '../directives/scroll-spy.directive';

import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';

import {HttpLink} from 'apollo-angular/http';

import * as realm from './realm';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {InfoComponent} from './components/info/info-item/info-item.component';
// import { LayoutComponent } from './layout/layout.component';
import {ScullyLibModule} from '@scullyio/ng-lib';
import { ImageModalComponent } from './components/gallery/image-modal/image-modal.component';
const uri = realm.graphqlUrl;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
	return {
		link: httpLink.create({
			uri,
			headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
		}),
		cache: new InMemoryCache()
	};
}

@NgModule({
	declarations: [
		AppComponent,
		ScrollSpyDirective,
		ImageModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ScullyLibModule,
		BrowserAnimationsModule
	],
	entryComponents: [InfoComponent],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink]
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
