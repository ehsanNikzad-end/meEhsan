import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../shared/constants/api-endpoints';
import { TeacherResponse, Subject, ApiResponse } from '../shared/models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  // Cache-busting headers to prevent browser/HTTP caching
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
  }

  addTeacher(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_ENDPOINTS.ADD_TEACHER, formData);
  }

  getTeachers(): Observable<TeacherResponse[]> {
    // Add cache-busting parameter and headers to prevent caching
    const url = `${API_ENDPOINTS.SHOW_TEACHERS}?_t=${Date.now()}`;
    return this.http.get<TeacherResponse[]>(url, { headers: this.getHeaders() });
  }

  getTeacherById(id: number): Observable<TeacherResponse> {
    return this.http.get<TeacherResponse>(`${API_ENDPOINTS.SHOW_TEACHERS}/${id}`);
  }

  updateTeacher(id: number, formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_ENDPOINTS.UPDATE_TEACHER}/${id}`, formData);
  }

  deleteTeacher(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API_ENDPOINTS.DELETE_TEACHER}/${id}`);
  }

  getSubjects(): Observable<Subject[]> {
    // Add cache-busting parameter and headers to prevent caching
    const url = `${API_ENDPOINTS.SHOW_SUBJECTS}?_t=${Date.now()}`;
    return this.http.get<Subject[]>(url, { headers: this.getHeaders() });
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${API_ENDPOINTS.SHOW_SUBJECTS}/${id}`);
  }

  addSubject(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_ENDPOINTS.ADD_SUBJECT, formData);
  }

  updateSubject(id: number, formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${API_ENDPOINTS.UPDATE_SUBJECT}/${id}`, formData);
  }

  deleteSubject(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API_ENDPOINTS.DELETE_SUBJECT}/${id}`);
  }
}

