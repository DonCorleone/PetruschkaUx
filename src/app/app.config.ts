import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingIndicatorInterceptor } from './interceptors/loading-indicator.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingIndicatorInterceptor,
      multi: true,
    },
    importProvidersFrom(HttpClientModule),
    provideRouter(ROUTES),
		provideHttpClient(withFetch()),
    provideAnimations()
  ],
};
