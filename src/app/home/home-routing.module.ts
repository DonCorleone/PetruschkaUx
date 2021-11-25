import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {RealmAuthGuard} from "../guards/realm-auth-guard.service";

const routes: Routes = [{path: '', component: HomeComponent}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule {
}
