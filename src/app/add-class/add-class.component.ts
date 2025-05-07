import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClassService } from '../services/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.scss',
})
export class AddClassComponent {
  classForm = {
    classId: null,
    subject: '',
    fee: null,
    time: null,
    teacher: '',
  };

  constructor(private classService: ClassService, private router: Router) {}

  // Method to handle form submission
  onSubmit() {
    const formDataAddStudent = new FormData();
    formDataAddStudent.append('classId', String(this.classForm.classId));
    formDataAddStudent.append('subject', this.classForm.subject);
    formDataAddStudent.append('fee', String(this.classForm.fee));
    formDataAddStudent.append('time', String(this.classForm.time));
    formDataAddStudent.append('teacher', this.classForm.teacher);

    this.classService.addClass(formDataAddStudent).subscribe(
      (response) => {
        console.log('Class added:', response);
        this.router.navigate(['/show-classes']);
      },
      (error) => {
        console.error('Error adding Class:', error);
      }
    );
  }
}
