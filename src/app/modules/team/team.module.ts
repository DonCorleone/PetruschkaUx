import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AboutItemComponent } from '../about/about-item/about-item.component';
import { AboutListComponent } from '../about/about-list/about-list.component';
import { AboutModalComponent } from '../about/about-modal/about-modal.component';

const routes: Routes = [{ path: '', component: TeamComponent }];
@NgModule({
  declarations: [TeamComponent, AboutItemComponent, AboutListComponent, AboutModalComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class TeamModule {}
