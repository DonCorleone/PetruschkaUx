import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './services/http-error-interceptor.service';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    importProvidersFrom(HttpClientModule),
    provideRouter(ROUTES),
    provideClientHydration(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
