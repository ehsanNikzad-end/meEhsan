import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ShowClassesComponent } from './show-classes/show-classes.component';
import { ShowStudentsComponent } from './show-students/show-students.component';
import { ShowTeachersComponent } from './show-teachers/show-teachers.component';
import { ShowSubjectsComponent } from './show-subjects/show-subjects.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { ShowRegisteredStudentsComponent } from './show-registered-students/show-registered-students.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: AddStudentComponent },
  { path: 'add-class', component: AddClassComponent },
  { path: 'edit-class/:id', component: AddClassComponent },
  { path: 'add-teacher', component: AddTeacherComponent },
  { path: 'edit-teacher/:id', component: AddTeacherComponent },
  { path: 'add-subject', component: AddSubjectComponent },
  { path: 'edit-subject/:id', component: AddSubjectComponent },
  { path: 'show-classes', component: ShowClassesComponent },
  { path: 'show-students', component: ShowStudentsComponent },
  { path: 'show-teachers', component: ShowTeachersComponent },
  { path: 'show-subjects', component: ShowSubjectsComponent },
  { path: 'register-student', component: RegisterStudentComponent },
  {
    path: 'show-registered-students',
    component: ShowRegisteredStudentsComponent,
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
};
