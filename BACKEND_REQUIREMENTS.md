# Backend API Requirements for Angular Student Management System

## Overview
This document outlines the API endpoints and requirements needed for the Angular frontend application. The backend should provide RESTful APIs that handle student management, class management, and student-class registrations.

---

## Base URL
- **Development**: `http://localhost:8000`
- **API Base Path**: `/api`

---

## API Endpoints

### 1. Student Management

#### 1.1 Add Student
- **Endpoint**: `POST /api/AddStudent`
- **Request**: `multipart/form-data`
  - `name` (string, required): Student name
  - `age` (number, required): Student age (1-120)
  - `country` (string, required): Student country
  - `phone` (string, required): Student phone number (10-15 digits)
  - `picture` (file, optional): Student profile picture (max 5MB, images only)
- **Response**: 
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "John Doe",
      "age": 20,
      "country": "USA",
      "phone": "1234567890",
      "picture": "student_123.jpg",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    },
    "message": "Student added successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Validation failed",
    "message": "Name is required"
  }
  ```

#### 1.2 Get All Students
- **Endpoint**: `GET /api/ShowStudents`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "age": 20,
      "country": "USA",
      "phone": "1234567890",
      "picture": "student_123.jpg",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
  ```

#### 1.3 Get Student by ID
- **Endpoint**: `GET /api/ShowStudents/:id`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "age": 20,
    "country": "USA",
    "phone": "1234567890",
    "picture": "student_123.jpg",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
  ```

#### 1.4 Update Student
- **Endpoint**: `PUT /api/UpdateStudent/:id`
- **Request**: `multipart/form-data` (same as Add Student)
- **Response**: Same as Add Student

#### 1.5 Delete Student
- **Endpoint**: `DELETE /api/DeleteStudent/:id`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Student deleted successfully"
  }
  ```

---

### 2. Class Management

#### 2.1 Add Class
- **Endpoint**: `POST /api/AddClass`
- **Request**: `multipart/form-data` or `application/json`
  - `classId` (string, required): Unique class identifier
  - `subject` (string, required): Class subject name
  - `fee` (number, required): Class fee (>= 0)
  - `time` (string, required): Class time (format: HH:MM)
  - `teacher` (string, required): Teacher name
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "classId": "CS101",
      "subject": "Computer Science",
      "fee": 500,
      "time": "10:00",
      "teacher": "Ahmad",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    },
    "message": "Class added successfully"
  }
  ```

#### 2.2 Get All Classes
- **Endpoint**: `GET /api/ShowClasses`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "classId": "CS101",
      "subject": "Computer Science",
      "fee": 500,
      "time": "10:00",
      "teacher": "Ahmad",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
  ```

#### 2.3 Get Class by ID
- **Endpoint**: `GET /api/ShowClasses/:id`
- **Response**: Same structure as single class object

#### 2.4 Update Class
- **Endpoint**: `PUT /api/UpdateClass/:id`
- **Request**: Same as Add Class
- **Response**: Same as Add Class

#### 2.5 Delete Class
- **Endpoint**: `DELETE /api/DeleteClass/:id`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Class deleted successfully"
  }
  ```

---

### 3. Student Registration

#### 3.1 Get Registration Page Data
- **Endpoint**: `GET /api/RegisterStudentPage`
- **Response**:
  ```json
  {
    "students": [
      {
        "id": 1,
        "name": "John Doe",
        "age": 20,
        "country": "USA",
        "phone": "1234567890",
        "picture": "student_123.jpg"
      }
    ],
    "classes": [
      {
        "id": 1,
        "classId": "CS101",
        "subject": "Computer Science",
        "fee": 500,
        "time": "10:00",
        "teacher": "Ahmad"
      }
    ]
  }
  ```

#### 3.2 Register Student to Class
- **Endpoint**: `POST /api/RegisterStudent`
- **Request**: `multipart/form-data` or `application/json`
  - `student_id` (number, required): Student ID
  - `class_id` (number, required): Class ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "student_id": 1,
      "class_id": 1,
      "student": {
        "id": 1,
        "name": "John Doe",
        "age": 20,
        "country": "USA",
        "phone": "1234567890",
        "picture": "student_123.jpg"
      },
      "classs": {
        "id": 1,
        "classId": "CS101",
        "subject": "Computer Science",
        "fee": 500,
        "time": "10:00",
        "teacher": "Ahmad"
      },
      "created_at": "2024-01-01T00:00:00Z"
    },
    "message": "Student registered successfully"
  }
  ```

#### 3.3 Get Registered Students
- **Endpoint**: `GET /api/ShowRegisteredStudents`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "student_id": 1,
      "class_id": 1,
      "student": {
        "id": 1,
        "name": "John Doe",
        "age": 20,
        "country": "USA",
        "phone": "1234567890",
        "picture": "student_123.jpg"
      },
      "classs": {
        "id": 1,
        "classId": "CS101",
        "subject": "Computer Science",
        "fee": 500,
        "time": "10:00",
        "teacher": "Ahmad"
      },
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
  ```

#### 3.4 Remove Student from Class
- **Endpoint**: `DELETE /api/DeleteStudentFromClass/:id`
- **Note**: `id` is the registration ID, not student ID
- **Response**:
  ```json
  {
    "success": true,
    "message": "Student removed from class successfully"
  }
  ```

#### 3.5 Remove Student from Course (Delete Student)
- **Endpoint**: `DELETE /api/DeleteStudentFromCourse/:id`
- **Note**: `id` is the student ID
- **Response**:
  ```json
  {
    "success": true,
    "message": "Student removed from course successfully"
  }
  ```

---

## Image Handling

### Image Storage
- **Base URL**: `http://localhost:8000/students/`
- **Path**: `/students/:filename`
- **Example**: `http://localhost:8000/students/student_123.jpg`

### Image Requirements
- **Max Size**: 5MB
- **Allowed Formats**: JPG, JPEG, PNG, GIF
- **Storage**: Store uploaded images in a `students` directory accessible via HTTP

---

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": "Error type",
  "message": "Human-readable error message"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

### Common Error Scenarios
1. **Validation Errors**: Return `400` with validation messages
2. **Not Found**: Return `404` when resource doesn't exist
3. **Server Errors**: Return `500` for unexpected errors
4. **Duplicate Entries**: Return `400` with appropriate message

---

## CORS Configuration

The backend must allow CORS requests from:
- **Development**: `http://localhost:4200`
- **Production**: Configure based on deployment URL

**Required Headers**:
```
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Data Validation

### Student Validation
- **Name**: Required, min 2 characters, max 100 characters
- **Age**: Required, integer, between 1 and 120
- **Country**: Required, min 2 characters, max 100 characters
- **Phone**: Required, 10-15 digits, numeric only
- **Picture**: Optional, max 5MB, image files only

### Class Validation
- **ClassId**: Required, unique, min 1 character, max 50 characters
- **Subject**: Required, min 2 characters, max 100 characters
- **Fee**: Required, number, >= 0
- **Time**: Required, valid time format (HH:MM)
- **Teacher**: Required, must be from predefined list

### Registration Validation
- **Student ID**: Required, must exist in students table
- **Class ID**: Required, must exist in classes table
- **Duplicate Check**: Prevent duplicate registrations (same student + class)

---

## Database Schema Recommendations

### Students Table
```sql
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL CHECK (age >= 1 AND age <= 120),
  country VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  picture VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Classes Table
```sql
CREATE TABLE classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  classId VARCHAR(50) NOT NULL UNIQUE,
  subject VARCHAR(100) NOT NULL,
  fee DECIMAL(10, 2) NOT NULL CHECK (fee >= 0),
  time VARCHAR(10) NOT NULL,
  teacher VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Registrations Table
```sql
CREATE TABLE registrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_registration (student_id, class_id)
);
```

---

## Additional Recommendations

1. **Pagination**: Consider adding pagination support for list endpoints:
   - Query params: `?page=1&per_page=10`
   - Response includes: `total`, `page`, `per_page`, `total_pages`

2. **Search/Filter**: Consider adding search capabilities:
   - Query params: `?search=term&filter=field`

3. **Sorting**: Consider adding sorting:
   - Query params: `?sort=field&order=asc|desc`

4. **Response Consistency**: Always return consistent response format:
   - Success: `{ success: true, data: {...}, message: "..." }`
   - Error: `{ success: false, error: "...", message: "..." }`

5. **Logging**: Implement proper logging for debugging and monitoring

6. **Security**: 
   - Validate all inputs
   - Sanitize file uploads
   - Implement rate limiting
   - Use prepared statements to prevent SQL injection

---

## Testing Checklist

Please ensure the following scenarios work correctly:

- [ ] Add student with all fields
- [ ] Add student with image upload
- [ ] Add student without image
- [ ] Update student
- [ ] Delete student
- [ ] Get all students
- [ ] Get student by ID
- [ ] Add class
- [ ] Update class
- [ ] Delete class
- [ ] Get all classes
- [ ] Get class by ID
- [ ] Register student to class
- [ ] Prevent duplicate registrations
- [ ] Get registered students
- [ ] Remove student from class
- [ ] Remove student from course
- [ ] Error handling for invalid data
- [ ] Error handling for non-existent resources
- [ ] Image upload and retrieval
- [ ] CORS configuration

---

## Contact

If you have any questions or need clarification on any endpoint, please contact the frontend development team.

**Last Updated**: 2024-01-01


