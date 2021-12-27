import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutItemComponent } from './about-item/about-item.component';
import { AboutListComponent } from './about-list/about-list.component';
import { AboutModalComponent } from './about-modal/about-modal.component';

@NgModule({
  declarations: [AboutComponent, AboutItemComponent, AboutListComponent, AboutModalComponent],
  imports: [CommonModule],
	exports: [AboutComponent]
})
export class AboutModule {}
