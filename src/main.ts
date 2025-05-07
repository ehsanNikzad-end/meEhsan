/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Import provideRouter
import { Routes } from '@angular/router';
import { AddStudentComponent } from './app/add-student/add-student.component';
import { appConfig } from './app/app.config';

// const routes: Routes = [
//   { path: 'add-student', component: AddStudentComponent },
// ];
bootstrapApplication(AppComponent, appConfig).catch((err) => {
  console.error('Error bootstrapping the application:', err); // Proper error handling
});
