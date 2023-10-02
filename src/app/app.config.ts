import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    importProvidersFrom(HttpClientModule),
    provideRouter(ROUTES),
  ],
};
