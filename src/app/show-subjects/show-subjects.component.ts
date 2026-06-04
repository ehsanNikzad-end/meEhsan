import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';
import { ConfirmationService } from '../shared/services/confirmation.service';
import { Subject } from '../shared/models/teacher.model';

@Component({
  selector: 'app-show-subjects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './show-subjects.component.html',
  styleUrl: './show-subjects.component.scss',
})
export class ShowSubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  filteredSubjects: Subject[] = [];
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
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.isLoading = true;
    this.loadingService.show();
    this.teacherService.getSubjects().subscribe({
      next: (response) => {
        this.subjects = response;
        this.filteredSubjects = response;
        this.isLoading = false;
        this.loadingService.hide();
      },
      error: (err) => {
        this.messageService.showError(err, 'مضمون');
        this.isLoading = false;
        this.loadingService.hide();
      },
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSubjects = this.subjects;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredSubjects = this.subjects.filter(
        (subject) => subject.name.toLowerCase().includes(term)
      );
    }
  }

  trackBySubjectId(index: number, item: Subject): number {
    return item.id;
  }

  deleteSubject(id: number): void {
    this.confirmationService.confirm({
      title: 'حذف مضمون',
      message: 'آیا مطمئن هستید که می‌خواهید این مضمون را حذف کنید؟ این عمل قابل بازگشت نیست.',
      confirmText: 'حذف',
      cancelText: 'لغو',
      iconType: 'danger',
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.isLoading = true;
        this.loadingService.show();
        this.teacherService.deleteSubject(id).subscribe({
          next: () => {
            this.messageService.success('مضمون با موفقیت حذف شد!');
            this.loadingService.hide();
            this.loadSubjects();
          },
          error: (err) => {
            this.messageService.showError(err, 'مضمون');
            this.isLoading = false;
            this.loadingService.hide();
          },
        });
      }
    });
  }

  editSubject(id: number): void {
    this.router.navigate(['/edit-subject', id]);
  }
}

