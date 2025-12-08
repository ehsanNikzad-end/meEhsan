import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../shared/constants/api-endpoints';
import { StudentResponse, ApiResponse } from '../shared/models/student.model';
import { RegisterStudentPageResponse, StudentRegistration } from '../shared/models/registration.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  addStudent(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_ENDPOINTS.ADD_STUDENT, formData);
  }

  getStudents(): Observable<StudentResponse[]> {
    return this.http.get<StudentResponse[]>(API_ENDPOINTS.SHOW_STUDENTS);
  }

  getStudentById(id: number): Observable<StudentResponse> {
    return this.http.get<StudentResponse>(`${API_ENDPOINTS.SHOW_STUDENTS}/${id}`);
  }

  updateStudent(id: number, formData: FormData): Observable<ApiResponse> {
    // Use POST for FormData updates (Laravel limitation with PUT + FormData)
    // Add _method=PUT so backend knows it's an update, not a create
    formData.append('_method', 'PUT');
    return this.http.post<ApiResponse>(`${API_ENDPOINTS.UPDATE_STUDENT}/${id}`, formData);
  }

  deleteStudent(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API_ENDPOINTS.DELETE_STUDENT}/${id}`);
  }

  getRegisteredStudents(): Observable<StudentRegistration[]> {
    return this.http.get<StudentRegistration[]>(API_ENDPOINTS.SHOW_REGISTERED_STUDENTS);
  }

  getStudentsAll(): Observable<StudentRegistration[]> {
    return this.http.get<StudentRegistration[]>(API_ENDPOINTS.SHOW_STUDENTS_ALL);
  }

  registerStudentPage(): Observable<RegisterStudentPageResponse> {
    return this.http.get<RegisterStudentPageResponse>(API_ENDPOINTS.REGISTER_STUDENT_PAGE);
  }

  registerStudent(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_ENDPOINTS.REGISTER_STUDENT, formData);
  }

  deleteFromClass(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API_ENDPOINTS.DELETE_STUDENT_FROM_CLASS}/${id}`);
  }

  deleteFromCourse(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API_ENDPOINTS.DELETE_STUDENT_FROM_COURSE}/${id}`);
  }
}
