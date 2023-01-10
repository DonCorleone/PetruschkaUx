import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgbCarouselModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateListComponent } from '../../components/update/update-list/update-list.component';
import { UpdateSlideComponent } from '../../components/update/update-slide/update-slide.component';
import { SponsorsComponent } from '../../components/sponsors/sponsors.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingIndicatorComponent } from 'src/app/components/loading-indicator/loading-indicator.component';
import { LoadingIndicatorInterceptor } from 'src/app/interceptors/loading-indicator.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UpdateListComponent,
    UpdateSlideComponent,
    SponsorsComponent,
    LoadingIndicatorComponent,
  ],
  imports: [CommonModule, RouterModule, NgbCollapseModule, NgbCarouselModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingIndicatorInterceptor, multi: true }],
  exports: [
    FooterComponent,
    HeaderComponent,
    NgbCollapseModule,
    NgbCarouselModule,
    UpdateListComponent,
    UpdateSlideComponent,
    SponsorsComponent,
    LoadingIndicatorComponent,
  ],
})
export class SharedModule {}
