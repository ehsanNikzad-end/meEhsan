import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { StudentRegistration } from '../shared/models/registration.model';
import { API_ENDPOINTS } from '../shared/constants/api-endpoints';

@Component({
  selector: 'app-show-registered-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './show-registered-students.component.html',
  styleUrl: './show-registered-students.component.scss',
})
export class ShowRegisteredStudentsComponent implements OnInit {
  registeredOnes: StudentRegistration[] = [];
  filteredRegistrations: StudentRegistration[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  Math = Math;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadRegisteredStudents();
  }

  loadRegisteredStudents(): void {
    this.isLoading = true;
    this.loadingService.show();
    this.loadStudentsAll();
    this.studentService.getRegisteredStudents().subscribe({
      next: (response) => {
        this.filteredRegistrations = response;
        this.updatePagination();
        this.isLoading = false;
        this.loadingService.hide();
      },
      error: (err) => {
        this.messageService.showError(err, 'ثبت‌نام شاگرد');
        this.isLoading = false;
        this.loadingService.hide();
      },
    });
  }
  
  loadStudentsAll(): void {
    this.studentService.getStudentsAll().subscribe({
      next: (response) => {
        this.registeredOnes = response;
      },
      error: (err) => {
        this.messageService.showError(err, 'شاگرد');
      },
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredRegistrations = this.registeredOnes;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredRegistrations = this.registeredOnes.filter(
        (reg) =>
          reg.student?.name?.toLowerCase().includes(term) ||
          reg.classs?.classId?.toLowerCase().includes(term) ||
          reg.classs?.subject?.toLowerCase().includes(term) ||
          String(reg.id).includes(term)
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRegistrations.length / this.itemsPerPage);
  }

  get paginatedRegistrations(): StudentRegistration[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRegistrations.slice(start, end);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
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
}
