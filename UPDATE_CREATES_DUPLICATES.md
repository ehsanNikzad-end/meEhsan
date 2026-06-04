# 🔴 Update Student Creating Duplicate Records

**Issue**: When updating a student via `POST /api/UpdateStudent/{id}`, it updates the student correctly BUT also creates 2 new duplicate student records.

**What we're sending**:
- Method: `POST`
- URL: `/api/UpdateStudent/58`
- Body: FormData with name, age, country, phone, picture

**Expected behavior**: Update existing student with ID 58

**Actual behavior**: Updates student 58 + creates 2 new student records

**Request**: Please check the backend route/controller - it seems to be executing create logic in addition to update logic.

