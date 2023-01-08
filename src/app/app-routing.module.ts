import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'upcoming',
    loadChildren: () => import('./modules/upcoming/upcoming.module').then((m) => m.UpcomingModule),
  },
  {
    path: 'tour',
    loadChildren: () => import('./modules/tour/tour.module').then((m) => m.TourModule),
  },
  {
    path: 'audio',
    loadChildren: () => import('./modules/audio/audio.module').then((m) => m.AudioModule),
  },
	{
		path: 'history',
		loadChildren: () => import('./modules/history/history.module').then((m) => m.HistoryModule),
	},
	{
		path: 'team',
		loadChildren: () => import('./modules/team/team.module').then((m) => m.TeamModule),
	},
	{
		path: 'contact',
		loadChildren: () => import('./modules/contact/contact.module').then((m) => m.ContactModule),
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
