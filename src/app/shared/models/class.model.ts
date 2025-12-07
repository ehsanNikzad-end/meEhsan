export interface Class {
  id: number;
  classId: string;
  subject: string;
  fee: number | string; // Backend may return as string
  time: string;
  teacher: string;
  created_at?: string;
  updated_at?: string;
}

export interface ClassFormData {
  classId: string;
  subject: string;
  fee: number | null;
  time: string;
  teacher: string;
}

export interface ClassResponse {
  id: number;
  classId: string;
  subject: string;
  fee: number | string; // Backend may return as string
  time: string;
  teacher: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  message?: string;
  data?: any;
  success?: boolean;
}
