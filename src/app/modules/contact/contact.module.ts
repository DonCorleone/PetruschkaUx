import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponentOverview } from './contact.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from '../../components/contact/contact.component';
import { PressComponent } from '../../components/press/press.component';
import { SponsorsComponent } from '../../components/sponsors/sponsors.component';

const routes: Routes = [{ path: '', component: ContactComponentOverview }];
@NgModule({
  declarations: [ContactComponentOverview, ContactComponent, PressComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ContactModule {}
