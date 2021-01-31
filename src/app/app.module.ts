import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';
import { HeaderComponent } from './header/header.component';
import { PromoComponent } from './promo/promo.component';
import { GigsComponent } from './gigs/gigs.component';
import { MusicComponent } from './music/music.component';
import { AboutComponent } from './about/about.component';
import { MerchComponent } from './merch/merch.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { VideoComponent } from './video/video.component';
import { InfoComponent } from './info/info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
