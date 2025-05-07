import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private apiUrlAdd = 'http://localhost:8000/api/AddClass';
  private apiUrlShowClasses = 'http://localhost:8000/api/ShowClasses';

  constructor(private http: HttpClient) {}

  addClass(formDataAddStudent: FormData): Observable<any> {
    return this.http.post(this.apiUrlAdd, formDataAddStudent);
  }

  getClasses(): Observable<any> {
    return this.http.get(this.apiUrlShowClasses);
  }

  deleteClass(id: number): Observable<any> {
    const apiUrlDelete = `http://localhost:8000/api/DeleteClass/${id}`;
    return this.http.delete(apiUrlDelete);
  }
}
