import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from '../services/student.service';
import { ClassService } from '../services/class.service';
import { LoadingService } from '../shared/services/loading.service';
import { MessageService } from '../shared/services/message.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <i class="bi bi-speedometer2"></i>
          </div>
          <div>
            <h1 class="page-title">داشبورد</h1>
            <p class="page-subtitle">نمای کلی سیستم مدیریت شاگردان</p>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
              <i class="bi bi-people"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ totalStudents }}</div>
              <div class="stat-label">کل شاگردان</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
              <i class="bi bi-book"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ totalClasses }}</div>
              <div class="stat-label">کل صنوف</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
              <i class="bi bi-check-circle"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ totalRegistrations }}</div>
              <div class="stat-label">ثبت‌نام‌ها</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2 class="section-title">اقدامات سریع</h2>
          <div class="actions-grid">
            <a routerLink="/add-student" class="action-card">
              <div class="action-icon" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
                <i class="bi bi-person-plus"></i>
              </div>
              <h3>افزودن شاگرد</h3>
              <p>ثبت یک شاگرد جدید</p>
            </a>
            <a routerLink="/add-class" class="action-card">
              <div class="action-icon" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                <i class="bi bi-book"></i>
              </div>
              <h3>افزودن صنف</h3>
              <p>ایجاد یک صنف جدید</p>
            </a>
            <a routerLink="/register-student" class="action-card">
              <div class="action-icon" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
                <i class="bi bi-clipboard-check"></i>
              </div>
              <h3>ثبت شاگرد</h3>
              <p>ثبت نام شاگرد در صنف</p>
            </a>
            <a routerLink="/show-students" class="action-card">
              <div class="action-icon" style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);">
                <i class="bi bi-people"></i>
              </div>
              <h3>مشاهده شاگردان</h3>
              <p>مرور تمام شاگردان</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Component-specific styles only */
    .header-icon {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    .quick-actions {
      margin-top: 2rem;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .action-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .action-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
      text-decoration: none;
      color: inherit;
    }

    .action-icon {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      margin-bottom: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .action-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
    }

    .action-card p {
      margin: 0;
      color: #6b7280;
      font-size: 0.9rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalStudents = 0;
  totalClasses = 0;
  totalRegistrations = 0;

  constructor(
    private studentService: StudentService,
    private classService: ClassService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loadingService.show();
    
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.totalStudents = students.length;
      },
      error: (err) => {
        this.messageService.showError(err, 'شاگرد');
      }
    });

    this.classService.getClasses().subscribe({
      next: (classes) => {
        this.totalClasses = classes.length;
      },
      error: (err) => {
        this.messageService.showError(err, 'صنف');
      }
    });

    this.studentService.getRegisteredStudents().subscribe({
      next: (registrations) => {
        this.totalRegistrations = registrations.length;
        this.loadingService.hide();
      },
      error: (err) => {
        this.messageService.showError(err, 'ثبت‌نام');
        this.loadingService.hide();
      }
    });
  }
}

