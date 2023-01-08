import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgbCarouselModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateListComponent } from '../../components/update/update-list/update-list.component';
import { UpdateSlideComponent } from '../../components/update/update-slide/update-slide.component';
import { SponsorsComponent } from '../../components/sponsors/sponsors.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, UpdateListComponent, UpdateSlideComponent, SponsorsComponent],
  imports: [CommonModule, RouterModule, NgbCollapseModule, NgbCarouselModule],
  exports: [
    FooterComponent,
    HeaderComponent,
    NgbCollapseModule,
    NgbCarouselModule,
    UpdateListComponent,
    UpdateSlideComponent,
    SponsorsComponent,
  ],
})
export class SharedModule {}
