import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgbCarouselModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingIndicatorInterceptor } from 'src/app/interceptors/loading-indicator.interceptor';
import { SwiperComponent } from './swiper/swiper.component';
import { register } from 'swiper/element/bundle';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent, 
  ],
  imports: [CommonModule, RouterModule, NgbCollapseModule,SwiperComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingIndicatorInterceptor, multi: true }],
  exports: [
    FooterComponent,
    HeaderComponent,
    NgbCollapseModule,
    NgbCarouselModule,
    SwiperComponent
  ],
})
export class SharedModule {
  constructor() {
    register();
  }
}
