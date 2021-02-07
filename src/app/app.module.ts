import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { MusicComponent } from './components/music/music.component';
import { CarouselUpdateComponent } from './components/update/carousel-update/carousel-update.component';
import { ContactComponent } from './components/contact/contact.component';
import { InfoComponent } from './components/info/info.component';
import { MerchComponent } from './components/merch/merch.component';
import { VideoComponent } from './components/video/video.component';
import { UpdateSlideComponent } from './components/update/update-slide/update-slide.component';

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
    UpdateSlideComponent,
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
