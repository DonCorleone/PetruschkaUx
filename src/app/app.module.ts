import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfoComponent } from './components/info/info-item/info-item.component';
import { ImageModalComponent } from './components/gallery/image-modal/image-modal.component';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';
import { TicketModalComponent } from './components/ticket/ticket-modal/ticket-modal.component';
import { TicketItemComponent } from './components/ticket/ticket-item/ticket-item.component';
import { AboutModule } from './modules/about/about.module';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [AppComponent, ScrollSpyDirective, ImageModalComponent, TicketModalComponent, TicketItemComponent],
  imports: [AboutModule, BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, ScullyLibModule], // ScullyLibModule
  entryComponents: [InfoComponent],
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
