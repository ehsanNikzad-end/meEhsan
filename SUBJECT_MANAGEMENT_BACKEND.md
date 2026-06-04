# Subject Management - Backend Requirements

## 🔴 New Feature: Subject Management System

The frontend now has subject management pages. The backend needs to implement the subjects API endpoints.

---

## 📋 Database Migration Required

### Create Subjects Table (if not exists)

**Table Name**: `subjects`

**Schema**:
```sql
CREATE TABLE subjects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Migration Notes**:
- `id` - Primary key, auto-increment
- `name` - Subject name (required, unique)
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

---

## 🔌 API Endpoints Required

### 1. Get All Subjects
- **Endpoint**: `GET /api/ShowSubjects`
- **Response**:
```json
[
  {
    "id": 1,
    "name": "English",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "name": "Computer Science",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### 2. Get Subject by ID
- **Endpoint**: `GET /api/ShowSubjects/:id`
- **Response**:
```json
{
  "id": 1,
  "name": "English",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### 3. Add Subject
- **Endpoint**: `POST /api/AddSubject`
- **Request**: `multipart/form-data` or `application/json`
  - `name` (string, required, unique): Subject name
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "English",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  "message": "Subject added successfully"
}
```

### 4. Update Subject
- **Endpoint**: `POST /api/UpdateSubject/:id` (use POST with FormData, same as student/teacher updates)
- **Request**: `multipart/form-data` or `application/json`
  - `name` (string, required, unique): Subject name
- **Response**: Same as Add Subject

### 5. Delete Subject
- **Endpoint**: `DELETE /api/DeleteSubject/:id`
- **Response**:
```json
{
  "success": true,
  "message": "Subject deleted successfully"
}
```

---

## ⚠️ Important Notes

1. **Validation**: 
   - Subject name is required
   - Subject name must be unique

2. **Relationships**:
   - Subjects are used in the teacher-subject many-to-many relationship
   - Check if subject is assigned to any teacher before allowing deletion (or cascade delete)

3. **Priority**: 
   - This is needed for the "Add Teacher" page to work properly
   - Currently, subjects dropdown is empty until backend is ready

---

## ✅ Status

- ✅ Frontend components created
- ✅ Frontend service methods created
- ✅ Routes configured
- ✅ UI integrated
- ⏳ Waiting for backend implementation

---

**Priority**: 🔴 High - Needed for subject management and teacher creation functionality



