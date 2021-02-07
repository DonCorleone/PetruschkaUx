import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RealmAuthGuardGuard } from './guards/realm-auth-guard.guard';


const routes: Routes = [  {
  path: '',
  component: AppComponent,
  canActivate: [ RealmAuthGuardGuard ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
