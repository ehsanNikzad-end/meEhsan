import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassService } from '../services/class.service';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { ConfirmationService } from '../shared/services/confirmation.service';
import { ClassResponse } from '../shared/models/class.model';

@Component({
  selector: 'app-show-classes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './show-classes.component.html',
  styleUrl: './show-classes.component.scss',
})
export class ShowClassesComponent implements OnInit {
  classes: ClassResponse[] = [];
  filteredClasses: ClassResponse[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  Math = Math;

  constructor(
    private classService: ClassService,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.isLoading = true;
    this.loadingService.show();
    this.classService.getClasses().subscribe({
      next: (response) => {
        this.classes = response;
        this.filteredClasses = response;
        this.updatePagination();
        this.isLoading = false;
        this.loadingService.hide();
      },
      error: (err) => {
        this.messageService.showError(err, 'صنف');
        this.isLoading = false;
        this.loadingService.hide();
      },
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredClasses = this.classes;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredClasses = this.classes.filter(
        (cls) =>
          cls.classId.toLowerCase().includes(term) ||
          cls.subject.toLowerCase().includes(term) ||
          cls.teacher.toLowerCase().includes(term) ||
          cls.time.toLowerCase().includes(term)
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredClasses.length / this.itemsPerPage);
  }

  get paginatedClasses(): ClassResponse[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredClasses.slice(start, end);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  trackByClassId(index: number, item: ClassResponse): number {
    return item.id;
  }

  formatFee(fee: number | string): string {
    const feeValue = typeof fee === 'string' ? parseFloat(fee) : fee;
    if (isNaN(feeValue)) return '0';
    
    // Format with commas (e.g., 10000 -> 10,000)
    return Math.round(feeValue).toLocaleString('en-US');
  }

  deleteClass(id: number): void {
    this.confirmationService.confirm({
      title: 'Delete Class',
      message: 'Are you sure you want to delete this class? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      iconType: 'danger',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.isLoading = true;
        this.loadingService.show();
        this.classService.deleteClass(id).subscribe({
          next: () => {
            this.messageService.success('Class deleted successfully!');
            this.loadingService.hide();
            this.loadClasses();
          },
          error: (err) => {
            this.messageService.showError(err, 'صنف');
            this.isLoading = false;
            this.loadingService.hide();
          },
        });
      }
    });
  }

  editClass(id: number): void {
    this.router.navigate(['/edit-class', id]);
  }
}
