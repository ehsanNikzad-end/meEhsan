import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { StudentRegistration } from '../shared/models/registration.model';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { ConfirmationService } from '../shared/services/confirmation.service';
import { API_ENDPOINTS } from '../shared/constants/api-endpoints';

@Component({
  selector: 'app-show-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './show-students.component.html',
  styleUrl: './show-students.component.scss',
})
export class ShowStudentsComponent implements OnInit {
  registeredOnes: StudentRegistration[] = [];
  studentsAll: StudentRegistration[] = [];
  filteredStudents: StudentRegistration[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  Math = Math;
  
  // Grouped students by class
  groupedStudents: { [key: string]: StudentRegistration[] } = {};
  classKeys: string[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.loadingService.show();
    this.loadStudentsAll();
    this.studentService.getRegisteredStudents().subscribe({
      next: (response) => {
        this.registeredOnes = response;
        this.filteredStudents = response;
        this.groupStudents();
        this.isLoading = false;
        this.loadingService.hide();
      },
      error: (err) => {
        this.messageService.showError(err, 'شاگرد');
        this.isLoading = false;
        this.loadingService.hide();
      },
    });
  }

  loadStudentsAll(): void {
    this.studentService.getStudentsAll().subscribe({
      next: (response) => {
        this.studentsAll = response;
      },
      error: (err) => {
        this.messageService.showError(err, 'شاگرد');
      },
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredStudents = this.registeredOnes;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredStudents = this.registeredOnes.filter(
        (reg) =>
          reg.student?.name?.toLowerCase().includes(term) ||
          reg.student?.country?.toLowerCase().includes(term) ||
          reg.classs?.classId?.toLowerCase().includes(term) ||
          reg.classs?.teacher?.toLowerCase().includes(term) ||
          reg.classs?.subject?.toLowerCase().includes(term)
      );
    }
    this.groupStudents();
  }

  groupStudents(): void {
    this.groupedStudents = {};
    this.filteredStudents.forEach((reg) => {
      const classKey = reg.classs?.classId || 'نامشخص';
      if (!this.groupedStudents[classKey]) {
        this.groupedStudents[classKey] = [];
      }
      this.groupedStudents[classKey].push(reg);
    });
    this.classKeys = Object.keys(this.groupedStudents).sort();
  }


  trackByRegistrationId(index: number, item: StudentRegistration): number {
    return item.id;
  }

  getImageUrl(picture: string | null | undefined): string {
    if (!picture || picture.trim() === '') {
      // Default avatar SVG - simple man icon
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2U1ZTdlYiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjcwIiByPSIzMCIgZmlsbD0iIzljYTNhZiIvPjxwYXRoIGQ9Ik0gNTAgMTMwIFEgNTAgMTIwIDEwMCAxMjAgVCAxNTAgMTIwIFEgMTUwIDEzMCAxMDAgMTMwIFoiIGZpbGw9IiM5Y2EzYWYiLz48L3N2Zz4=';
    }
    return `${API_ENDPOINTS.IMAGE_BASE_URL}${picture}`;
  }

  deleteFromClass(id: number): void {
    this.confirmationService.confirm({
      title: 'حذف از صنف',
      message: 'آیا مطمئن هستید که می‌خواهید این شاگرد را از صنف حذف کنید؟',
      confirmText: 'حذف',
      cancelText: 'لغو',
      confirmButtonClass: 'btn-warning',
      iconType: 'warning',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.isLoading = true;
        this.loadingService.show();
        this.studentService.deleteFromClass(id).subscribe({
          next: () => {
            this.messageService.success('شاگرد با موفقیت از صنف حذف شد!');
            this.loadingService.hide();
            this.loadStudents();
          },
          error: (err) => {
            this.messageService.showError(err, 'Student Registration');
            this.isLoading = false;
            this.loadingService.hide();
          },
        });
      }
    });
  }

  deleteFromCourse(id: number): void {
    this.confirmationService.confirm({
      title: 'حذف از دوره',
      message: 'آیا مطمئن هستید که می‌خواهید این شاگرد را از دوره حذف کنید؟ این عمل قابل بازگشت نیست.',
      confirmText: 'حذف',
      cancelText: 'لغو',
      iconType: 'danger',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.isLoading = true;
        this.loadingService.show();
        this.studentService.deleteFromCourse(id).subscribe({
          next: () => {
            this.messageService.success('شاگرد با موفقیت از دوره حذف شد!');
            this.loadingService.hide();
            this.loadStudents();
          },
          error: (err) => {
            this.messageService.showError(err, 'Student');
            this.isLoading = false;
            this.loadingService.hide();
          },
        });
      }
    });
  }

  editStudent(id: number): void {
    this.router.navigate(['/edit-student', id]);
  }
}
