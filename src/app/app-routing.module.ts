import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RealmAuthGuardGuard } from './guards/realm-auth-guard.guard';
// import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  // {
  // path: '',
  // component: LayoutComponent,
  // canActivate: [ RealmAuthGuardGuard ]
  // },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule) ,
    canActivate: [ RealmAuthGuardGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
