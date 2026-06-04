# Teacher Management - Backend Requirements

## 🔴 New Feature: Teacher Management System

The frontend now has a complete teacher management system. The backend needs to implement the teachers table and API endpoints.

---

## 📋 Database Migration Required

### Create Teachers Table

**Table Name**: `teachers`

**Schema**:
```sql
CREATE TABLE teachers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Migration Notes**:
- `id` - Primary key, auto-increment
- `name` - Teacher's full name (required, unique recommended)
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

---

## 🔌 API Endpoints Required

### 1. Get All Teachers
- **Endpoint**: `GET /api/ShowTeachers`
- **Response**:
```json
[
  {
    "id": 1,
    "name": "Ahmad",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "name": "Qadir",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### 2. Get Teacher by ID
- **Endpoint**: `GET /api/ShowTeachers/:id`
- **Response**:
```json
{
  "id": 1,
  "name": "Ahmad",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### 3. Add Teacher
- **Endpoint**: `POST /api/AddTeacher`
- **Request**: `multipart/form-data` or `application/json`
  - `name` (string, required): Teacher's full name
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Ahmad",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "message": "Teacher added successfully"
}
```

### 4. Update Teacher
- **Endpoint**: `POST /api/UpdateTeacher/:id` (use POST with FormData, same as student updates)
- **Request**: `multipart/form-data` or `application/json`
  - `name` (string, required): Teacher's full name
- **Response**: Same as Add Teacher

### 5. Delete Teacher
- **Endpoint**: `DELETE /api/DeleteTeacher/:id`
- **Response**:
```json
{
  "success": true,
  "message": "Teacher deleted successfully"
}
```

---

## ⚠️ Important Notes

1. **Validation**: 
   - Teacher name is required
   - Consider making name unique to prevent duplicates

2. **Relationships**:
   - Teachers are referenced in the `classes` table via the `teacher` field (currently stored as string)
   - Consider adding a foreign key relationship if you want to normalize the database

3. **Migration Priority**: 
   - This is needed for the "Add Class" page to work properly
   - Currently, teachers are hardcoded in the frontend
   - Once backend is ready, frontend will fetch teachers dynamically

---

## ✅ Status

- ✅ Frontend components created
- ✅ Frontend service created
- ✅ Routes configured
- ✅ UI integrated
- ⏳ Waiting for backend implementation

---

**Priority**: 🔴 High - Needed for teacher management and class creation functionality



