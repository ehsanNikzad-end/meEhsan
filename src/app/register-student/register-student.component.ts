import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-student',
  imports: [NgFor, FormsModule],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.scss',
})
export class RegisterStudentComponent implements OnInit {
  students: any[] = [];
  classes: any[] = [];
  constructor(private studentService: StudentService, private router: Router) {}
  ngOnInit(): void {
    this.studentService.registerStudentPage().subscribe(
      (response) => {
        this.classes = response.classes;
        this.students = response.students;
      },
      (error) => {
        console.error('Error loading classes:', error);
      }
    );
  }

  // Method to handle form submission
  studentForm = {
    student_id: null,
    class_id: null,
  };
  onSubmit() {
    const formDataRegisterStudent = new FormData();
    formDataRegisterStudent.append(
      'student_id',
      String(this.studentForm.student_id)
    );
    formDataRegisterStudent.append(
      'class_id',
      String(this.studentForm.class_id)
    );

    this.studentService.registerStudent(formDataRegisterStudent).subscribe(
      (response) => {
        console.log('Student is registered:', response);
        this.router.navigate(['/show-students']);
      },
      (error) => {
        console.error('Error adding Class:', error);
      }
    );
  }
}
