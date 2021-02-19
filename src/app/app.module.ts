import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

import { HttpLink } from 'apollo-angular/http';

import * as realm from './realm';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { GigsListComponent } from './components/gigs/gigs-list/gigs-list.component';
import { AboutListComponent } from './components/about/about-list/about-list.component';
import { GigsItemComponent } from './components/gigs/gigs-item/gigs-item.component';
import { AboutItemComponent } from './components/about/about-item/about-item.component';
import { PromoComponent } from './components/promo/promo/promo.component';
import { PromoCarouselComponent } from './components/promo/promo-carousel/promo-carousel.component';
import { CarouselUpdateComponent } from './components/update/carousel-update/carousel-update.component';
import { ContactComponent } from './components/contact/contact.component';
import { InfoComponent } from './components/info/info-item/info-item.component';
import { VideoComponent } from './components/video/video.component';
import { UpdateSlideComponent } from './components/update/update-slide/update-slide.component';
import { MerchItemComponent } from './components/merch/merch-item/merch-item.component';
import { MerchListComponent } from './components/merch/merch-list/merch-list.component';
import { MusicItemComponent } from './components/music/music-item/music-item.component';
import { MusicListComponent } from './components/music/music-list/music-list.component';
import { LayoutComponent } from './layout/layout.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { LocationItemComponent } from './components/location/location-item/location-item.component';
import { InfoModalComponent } from './components/info/info-modal/info-modal.component';
import { LocationModalComponent } from './components/location/location-modal/location-modal.component';
import { AboutModalComponent } from './components/about/about-modal/about-modal.component';

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
    GigsListComponent,
    MusicListComponent,
    AboutListComponent,
    MerchListComponent,
    ContactComponent,
    FooterComponent,
    VideoComponent,
    InfoComponent,
    GigsItemComponent,
    PromoCarouselComponent,
    CarouselUpdateComponent,
    UpdateSlideComponent,
    AboutItemComponent,
    MerchItemComponent,
    MusicItemComponent,
    LayoutComponent,
    LocationItemComponent,
    InfoModalComponent,
    LocationModalComponent,
    AboutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ScullyLibModule
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
