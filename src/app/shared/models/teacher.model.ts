export interface Subject {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  pivot?: {
    teacher_id: number;
    subject_id: number;
  };
}

export interface Teacher {
  id: number;
  name: string;
  phone: string;
  subjects?: Subject[];
  created_at?: string;
  updated_at?: string;
}

export interface TeacherResponse {
  id: number;
  name: string;
  phone: string;
  subjects?: Subject[];
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  message?: string;
  data?: any;
  success?: boolean;
}

