/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  // Critical bootstrap error - log to console as this happens before app initialization
  console.error('Error bootstrapping the application:', err);
});
