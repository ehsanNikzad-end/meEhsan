import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="app-header" [class.sidebar-collapsed]="sidebarCollapsed">
      <div class="header-left">
        <button class="mobile-menu-btn" (click)="toggleMobileMenu.emit()" *ngIf="showMobileMenu">
          <i class="bi bi-list"></i>
        </button>
        <div class="header-title">
          <h1>{{ title }}</h1>
          <p class="subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        </div>
      </div>
      
      <div class="header-right">
        <div class="header-actions">
          <button class="action-btn" title="اعلان‌ها" *ngIf="showNotifications">
            <i class="bi bi-bell"></i>
            <span class="badge" *ngIf="notificationCount > 0">{{ notificationCount }}</span>
          </button>
          
          <div class="user-menu">
            <button class="user-btn" (click)="toggleUserMenu = !toggleUserMenu">
              <div class="user-avatar">
                <i class="bi bi-person-circle"></i>
              </div>
              <span class="user-name">{{ userName }}</span>
              <i class="bi bi-chevron-down"></i>
            </button>
            
            <div class="dropdown-menu" *ngIf="toggleUserMenu" (click)="$event.stopPropagation()">
              <a class="dropdown-item" (click)="navigateTo('/profile')">
                <i class="bi bi-person"></i> پروفایل
              </a>
              <a class="dropdown-item" (click)="navigateTo('/settings')">
                <i class="bi bi-gear"></i> تنظیمات
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" (click)="logout()">
                <i class="bi bi-box-arrow-right"></i> خروج
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      position: fixed;
      top: 0;
      left: 280px;
      right: 0;
      height: 70px;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      z-index: 999;
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .app-header.sidebar-collapsed {
      left: 80px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #1e40af;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.2s;
    }

    .mobile-menu-btn:hover {
      background: #f3f4f6;
    }

    .header-title h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e40af;
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      margin: 0;
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .action-btn {
      position: relative;
      background: #f3f4f6;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      color: #4b5563;
    }

    .action-btn:hover {
      background: #e5e7eb;
      transform: translateY(-2px);
    }

    .action-btn i {
      font-size: 1.25rem;
    }

    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: #ef4444;
      color: white;
      font-size: 0.75rem;
      padding: 0.125rem 0.375rem;
      border-radius: 10px;
      font-weight: 600;
      min-width: 18px;
      text-align: center;
    }

    .user-menu {
      position: relative;
    }

    .user-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #f3f4f6;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .user-btn:hover {
      background: #e5e7eb;
      transform: translateY(-2px);
    }

    .user-avatar {
      font-size: 1.75rem;
      color: #1e40af;
    }

    .user-name {
      font-weight: 600;
      color: #1f2937;
      font-size: 0.9rem;
    }

    .user-btn i:last-child {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      min-width: 200px;
      padding: 0.5rem;
      z-index: 1000;
      animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: #4b5563;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s;
      cursor: pointer;
    }

    .dropdown-item:hover {
      background: #f3f4f6;
      color: #1e40af;
    }

    .dropdown-item i {
      font-size: 1.1rem;
    }

    .dropdown-divider {
      height: 1px;
      background: #e5e7eb;
      margin: 0.5rem 0;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .app-header {
        left: 0;
      }

      .mobile-menu-btn {
        display: block;
      }

      .user-name {
        display: none;
      }

      .header-title h1 {
        font-size: 1.25rem;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() title: string = 'داشبورد';
  @Input() subtitle: string = '';
  @Input() userName: string = 'مدیر';
  @Input() notificationCount: number = 0;
  @Input() showNotifications: boolean = true;
  @Input() showMobileMenu: boolean = false;
  @Input() sidebarCollapsed: boolean = false;
  @Output() toggleMobileMenu = new EventEmitter<void>();

  toggleUserMenu = false;

  constructor(private router: Router) {
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      this.toggleUserMenu = false;
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.toggleUserMenu = false;
  }

  logout() {
    // Implement logout logic
    this.toggleUserMenu = false;
    // TODO: Implement actual logout functionality
  }
}

