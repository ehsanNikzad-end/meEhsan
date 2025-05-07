import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent {
  studentForm = {
    name: '',
    age: null,
    country: '',
    phone: null,
    picture: null,
  };

  constructor(private studentService: StudentService, private router: Router) {}

  // Method to handle form submission
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.studentForm.name);
    formData.append('age', String(this.studentForm.age));
    formData.append('country', this.studentForm.country);
    formData.append('phone', String(this.studentForm.phone));

    // Append picture if available
    if (this.studentForm.picture) {
      const file = this.studentForm.picture as File;
      formData.append('picture', file, file.name);
    }

    this.studentService.addStudent(formData).subscribe(
      (response) => {
        console.log('Student added:', response);
        this.router.navigate(['/register-student']);
      },
      (error) => {
        console.error('Error adding student:', error);
      }
    );
  }

  // File change handler
  onFileChange(event: any) {
    if (event.target.files) {
      this.studentForm.picture = event.target.files[0]; // Assign the first file in the FileList
    }
  }
}
