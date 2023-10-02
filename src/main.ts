/// <reference types="@angular/localize" />

import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { register } from 'swiper/element/bundle';

if (environment.production) {
  enableProdMode();
}

register();
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
