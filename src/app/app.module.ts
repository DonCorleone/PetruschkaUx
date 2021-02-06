import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';
import { HeaderComponent } from './header/header.component';
import { MusicComponent } from './music/music.component';
import { MerchComponent } from './merch/merch.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { VideoComponent } from './video/video.component';
import { InfoComponent } from './info/info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselUpdateComponent } from './carousel-update/carousel-update.component';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

import * as realm from './realm';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GigsComponent } from './components/gigs/gigs/gigs.component';
import { AboutComponent } from './components/about/about/about.component';
import { GigsItemComponent } from './components/gigs/gigs-item/gigs-item.component';
import { AboutItemComponent } from './components/about/about-item/about-item.component';
import { PromoComponent } from './components/promo/promo/promo.component';
import { CarouselPromoComponent } from './components/promo/carousel-promo/carousel-promo.component';

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
    HeaderComponent,
    PromoComponent,
    GigsComponent,
    MusicComponent,
    AboutComponent,
    MerchComponent,
    ContactComponent,
    FooterComponent,
    VideoComponent,
    InfoComponent,
    GigsItemComponent,
    CarouselPromoComponent,
    CarouselUpdateComponent,
    AboutItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FlexLayoutModule
  ],
  entryComponents: [InfoComponent],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
