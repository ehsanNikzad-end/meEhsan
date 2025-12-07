import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { ConfirmationService } from '../shared/services/confirmation.service';
import { TeacherResponse } from '../shared/models/teacher.model';

@Component({
  selector: 'app-show-teachers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './show-teachers.component.html',
  styleUrl: './show-teachers.component.scss',
})
export class ShowTeachersComponent implements OnInit {
  teachers: TeacherResponse[] = [];
  filteredTeachers: TeacherResponse[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.isLoading = true;
    this.loadingService.show();
    this.teacherService.getTeachers().subscribe({
      next: (response) => {
        this.teachers = response;
        this.filteredTeachers = response;
        this.isLoading = false;
        this.loadingService.hide();
      },
      error: (err) => {
        this.messageService.showError(err, 'استاد');
        this.isLoading = false;
        this.loadingService.hide();
      },
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTeachers = this.teachers;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredTeachers = this.teachers.filter(
        (teacher) => 
          teacher.name.toLowerCase().includes(term) ||
          teacher.phone?.toLowerCase().includes(term) ||
          teacher.subjects?.some(s => s.name.toLowerCase().includes(term))
      );
    }
  }

  trackByTeacherId(index: number, item: TeacherResponse): number {
    return item.id;
  }

  deleteTeacher(id: number): void {
    this.confirmationService.confirm({
      title: 'حذف استاد',
      message: 'آیا مطمئن هستید که می‌خواهید این استاد را حذف کنید؟ این عمل قابل بازگشت نیست.',
      confirmText: 'حذف',
      cancelText: 'لغو',
      iconType: 'danger',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.isLoading = true;
        this.loadingService.show();
        this.teacherService.deleteTeacher(id).subscribe({
          next: () => {
            this.messageService.success('استاد با موفقیت حذف شد!');
            this.loadingService.hide();
            this.loadTeachers();
          },
          error: (err) => {
            this.messageService.showError(err, 'استاد');
            this.isLoading = false;
            this.loadingService.hide();
          },
        });
      }
    });
  }

  editTeacher(id: number): void {
    this.router.navigate(['/edit-teacher', id]);
  }

  getSubjectsNames(teacher: TeacherResponse): string {
    if (!teacher.subjects || teacher.subjects.length === 0) {
      return 'No subjects';
    }
    return teacher.subjects.map(s => s.name).join(', ');
  }
}

