import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './tour.component';
import { MerchListComponent } from '../../components/merch/merch-list/merch-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MerchItemComponent } from '../../components/merch/merch-item/merch-item.component';

const routes: Routes = [{ path: '', component: TourComponent }];
@NgModule({
  declarations: [TourComponent, MerchListComponent, MerchItemComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class TourModule {}
