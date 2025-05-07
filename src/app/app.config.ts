import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ShowClassesComponent } from './show-classes/show-classes.component';
import { ShowStudentsComponent } from './show-students/show-students.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { ShowRegisteredStudentsComponent } from './show-registered-students/show-registered-students.component';

const routes: Routes = [
  { path: '', redirectTo: '/add-student', pathMatch: 'full' },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'add-class', component: AddClassComponent },
  { path: 'show-classes', component: ShowClassesComponent },
  { path: 'show-students', component: ShowStudentsComponent },
  { path: 'register-student', component: RegisterStudentComponent },
  {
    path: 'show-registered-students',
    component: ShowRegisteredStudentsComponent,
  },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};
