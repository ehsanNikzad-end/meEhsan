import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../shared/constants/api-endpoints';
import { Class, ClassResponse, ApiResponse } from '../shared/models/class.model';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private http: HttpClient) {}

  addClass(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(API_ENDPOINTS.ADD_CLASS, formData);
  }

  getClasses(): Observable<ClassResponse[]> {
    return this.http.get<ClassResponse[]>(API_ENDPOINTS.SHOW_CLASSES);
  }

  getClassById(id: number): Observable<ClassResponse> {
    return this.http.get<ClassResponse>(`${API_ENDPOINTS.SHOW_CLASSES}/${id}`);
  }

  updateClass(id: number, formData: FormData): Observable<ApiResponse> {
    // Use POST for FormData updates (consistent with student updates)
    return this.http.post<ApiResponse>(`${API_ENDPOINTS.UPDATE_CLASS}/${id}`, formData);
  }

  deleteClass(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${API_ENDPOINTS.DELETE_CLASS}/${id}`);
  }
}
