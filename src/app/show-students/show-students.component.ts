import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-show-students',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-students.component.html',
  styleUrl: './show-students.component.scss',
})
export class ShowStudentsComponent implements OnInit {
  [x: string]: any;
  registeredOnes: any[] = [];
  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      (response) => {
        this.registeredOnes = response;
      },
      (error) => {
        console.error('Error loading classes:', error);
      }
    );
  }

  deleteFromClass(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteFromClass(id).subscribe(
        (response) => {
          this.registeredOnes = this.registeredOnes.filter((c) => c.id !== id);
          console.log('Student deleted from class', response);
        },
        (error) => {
          console.error('Error deleting class:', error);
        }
      );
    }
  }

  deleteFromCourse(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteFromCourse(id).subscribe(
        (response) => {
          this.registeredOnes = this.registeredOnes.filter((c) => c.id !== id);
          console.log('Student deleted from course', response);
        },
        (error) => {
          console.error('Error deleting Course:', error);
        }
      );
    }
  }
}
