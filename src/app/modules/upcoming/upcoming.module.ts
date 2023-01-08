import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingComponent } from './upcoming.component';
import { GigsListComponent } from '../../components/gigs/gigs-list/gigs-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GigsItemComponent } from '../../components/gigs/gigs-item/gigs-item.component';

const routes: Routes = [{ path: '', component: UpcomingComponent }];
@NgModule({
  declarations: [UpcomingComponent, GigsListComponent, GigsItemComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class UpcomingModule {}
