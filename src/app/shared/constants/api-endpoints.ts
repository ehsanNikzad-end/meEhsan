import { environment } from '../../../environments/environment';

export const API_ENDPOINTS = {
  // Student endpoints
  ADD_STUDENT: `${environment.apiUrl}/AddStudent`,
  SHOW_STUDENTS: `${environment.apiUrl}/ShowStudents`,
  UPDATE_STUDENT: `${environment.apiUrl}/UpdateStudent`,
  DELETE_STUDENT: `${environment.apiUrl}/DeleteStudent`,
  
  // Class endpoints
  ADD_CLASS: `${environment.apiUrl}/AddClass`,
  SHOW_CLASSES: `${environment.apiUrl}/ShowClasses`,
  UPDATE_CLASS: `${environment.apiUrl}/UpdateClass`,
  DELETE_CLASS: `${environment.apiUrl}/DeleteClass`,
  
  // Registration endpoints
  REGISTER_STUDENT_PAGE: `${environment.apiUrl}/RegisterStudentPage`,
  REGISTER_STUDENT: `${environment.apiUrl}/RegisterStudent`,
  SHOW_REGISTERED_STUDENTS: `${environment.apiUrl}/ShowRegisteredStudents`,
  SHOW_STUDENTS_ALL: `${environment.apiUrl}/ShowStudentsAll`,
  DELETE_STUDENT_FROM_CLASS: `${environment.apiUrl}/DeleteStudentFromClass`,
  DELETE_STUDENT_FROM_COURSE: `${environment.apiUrl}/DeleteStudentFromCourse`,
  
  // Teacher endpoints
  ADD_TEACHER: `${environment.apiUrl}/AddTeacher`,
  SHOW_TEACHERS: `${environment.apiUrl}/ShowTeachers`,
  UPDATE_TEACHER: `${environment.apiUrl}/UpdateTeacher`,
  DELETE_TEACHER: `${environment.apiUrl}/DeleteTeacher`,
  
  // Subject endpoints
  SHOW_SUBJECTS: `${environment.apiUrl}/ShowSubjects`,
  ADD_SUBJECT: `${environment.apiUrl}/AddSubject`,
  UPDATE_SUBJECT: `${environment.apiUrl}/UpdateSubject`,
  DELETE_SUBJECT: `${environment.apiUrl}/DeleteSubject`,
  
  // Image base URL
  IMAGE_BASE_URL: `${environment.imageUrl}/students/`,
};
