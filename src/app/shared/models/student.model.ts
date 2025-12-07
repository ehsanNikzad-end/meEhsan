export interface Student {
  id: number;
  name: string;
  age: number;
  country: string;
  phone: string;
  picture: string;
  created_at?: string;
  updated_at?: string;
}

export interface StudentFormData {
  name: string;
  age: number | null;
  country: string;
  phone: number | null;
  picture: File | null;
}

export interface StudentResponse {
  id: number;
  name: string;
  age: number;
  country: string;
  phone: string;
  picture: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  message?: string;
  data?: any;
  success?: boolean;
}
