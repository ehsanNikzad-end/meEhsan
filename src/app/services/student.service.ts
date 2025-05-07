import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:8000/api/AddStudent';
  private apiUrlShowStudents = 'http://localhost:8000/api/ShowStudents';
  private apiUrlRegisterStudentPage =
    'http://localhost:8000/api/RegisterStudentPage';
  private apiUrlRegisterStudent = 'http://localhost:8000/api/RegisterStudent';
  private apiUrlShowRegisteredStudents =
    'http://localhost:8000/api/ShowRegisteredStudents';

  constructor(private http: HttpClient) {}

  addStudent(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getStudents(): Observable<any> {
    return this.http.get(this.apiUrlShowStudents);
  }

  getRegisteredStudents(): Observable<any> {
    return this.http.get(this.apiUrlShowRegisteredStudents);
  }

  registerStudentPage(): Observable<any> {
    return this.http.get(this.apiUrlRegisterStudentPage);
  }

  registerStudent(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrlRegisterStudent, formData);
  }

  deleteFromClass(id: number): Observable<any> {
    const apiUrlDeleteFromClass = `http://localhost:8000/api/DeleteStudentFromClass/${id}`;
    return this.http.delete(apiUrlDeleteFromClass);
  }

  deleteFromCourse(id: number): Observable<any> {
    const apiUrlDeleteFromCourse = `http://localhost:8000/api/DeleteStudentFromCourse/${id}`;
    return this.http.delete(apiUrlDeleteFromCourse);
  }
}
