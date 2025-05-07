import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-show-registered-students',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-registered-students.component.html',
  styleUrl: './show-registered-students.component.scss',
})
export class ShowRegisteredStudentsComponent implements OnInit {
  registeredOnes: any[] = [];
  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.studentService.getRegisteredStudents().subscribe(
      (response) => {
        this.registeredOnes = response;
      },
      (error) => {
        console.error('Error loading classes:', error);
      }
    );
  }
}
