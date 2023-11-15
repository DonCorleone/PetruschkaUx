import { Route } from '@angular/router';
import { SuccessComponent } from './components/success/success.component';

export const ROUTES: Route[] = [
    {
      path: '',
      loadComponent: () => import('./components/promo/promo/promo.component').then((m) => m.PromoComponent),
    },
    {
      path: 'upcoming',
      loadComponent: () => import('./components/gigs/gigs-list/gigs-list.component').then((m) => m.GigsListComponent),
			data: { animation: 'filterPage' }
    },
    {
      path: 'tour',
      loadComponent: () => import('./components/merch/merch-list/merch-list.component').then((m) => m.MerchListComponent),
    },
    {
      path: 'audio',
      loadComponent: () => import('./components/music/music-list/music-list.component').then((m) => m.MusicListComponent),
    },
    {
      path: 'history',
      loadComponent: () =>
        import('./components/history/history-list/history-list.component').then((m) => m.HistoryListComponent),
    },
    {
      path: 'team',
      loadComponent: () => import('./components/about/about-list/about-list.component').then((m) => m.AboutListComponent),
    },
    {
      path: 'contact',
      loadComponent: () => import('./components/contact/contact.component').then((m) => m.ContactComponent),
    },
    {
      path: 'success',
			loadComponent: () => import('./components/success/success.component').then((m) => m.SuccessComponent),
    },
  ];
