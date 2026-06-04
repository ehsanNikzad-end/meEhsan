import { Student } from './student.model';
import { Class } from './class.model';

export interface StudentRegistration {
  id: number;
  student_id: number;
  class_id: number;
  student: Student;
  classs: Class;
  created_at?: string;
  updated_at?: string;
}

// Raw response from backend (without nested objects)
export interface StudentRegistrationRaw {
  id: number;
  student_id: number;
  class_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface RegistrationFormData {
  student_id: number | null;
  class_id: number | null;
}

export interface RegisterStudentPageResponse {
  students: Student[];
  classes: Class[];
}

