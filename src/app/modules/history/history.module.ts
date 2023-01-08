import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { HistoryListComponent } from '../../components/history/history-list/history-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: HistoryComponent }];

@NgModule({
  declarations: [HistoryComponent, HistoryListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class HistoryModule {}
