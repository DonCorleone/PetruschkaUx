import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageModalComponent } from './components/gallery/image-modal/image-modal.component';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';
import { TicketModalComponent } from './components/ticket/ticket-modal/ticket-modal.component';
import { TicketItemComponent } from './components/ticket/ticket-item/ticket-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpcomingModule } from './modules/upcoming/upcoming.module';
import { SharedModule } from './modules/shared/shared.module';
import { TourModule } from './modules/tour/tour.module';
import { AudioModule } from './modules/audio/audio.module';
import { HistoryModule } from './modules/history/history.module';
import { TeamModule } from './modules/team/team.module';
import { ContactModule } from './modules/contact/contact.module';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [AppComponent, ScrollSpyDirective, ImageModalComponent, TicketModalComponent, TicketItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    UpcomingModule,
    SharedModule,
    TourModule,
    AudioModule,
    HistoryModule,
    TeamModule,
    ContactModule,
    ScullyLibModule,
  ],
  exports: [HttpClientModule],
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
