import { Component, NgModule, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-show-classes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-classes.component.html',
  styleUrl: './show-classes.component.scss',
})
export class ShowClassesComponent implements OnInit {
  classes: any[] = [];
  constructor(private classService: ClassService, private router: Router) {}

  ngOnInit(): void {
    this.classService.getClasses().subscribe(
      (response) => {
        this.classes = response;
      },
      (error) => {
        console.error('Error loading classes:', error);
      }
    );
  }

  deleteClass(id: number) {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classService.deleteClass(id).subscribe(
        (response) => {
          this.classes = this.classes.filter((c) => c.id !== id);
          console.log('Class deleted', response);
        },
        (error) => {
          console.error('Error deleting class:', error);
        }
      );
    }
  }
}
