import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar" [class.collapsed]="isCollapsed">
      <div class="sidebar-header">
        <div class="logo-container">
          <i class="bi bi-mortarboard-fill logo-icon"></i>
          <span class="logo-text" *ngIf="!isCollapsed">StudentHub</span>
        </div>
        <button class="toggle-btn" (click)="toggleSidebar()" title="تغییر اندازه منو">
          <i class="bi" [class.bi-chevron-left]="!isCollapsed" [class.bi-chevron-right]="isCollapsed"></i>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li *ngFor="let item of navItems" class="nav-item">
            <a 
              [routerLink]="item.route" 
              routerLinkActive="active"
              [routerLinkActiveOptions]="{exact: false}"
              class="nav-link"
              [title]="item.label"
            >
              <i [class]="'bi ' + item.icon" class="nav-icon"></i>
              <span class="nav-text" *ngIf="!isCollapsed">{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="sidebar-footer" *ngIf="!isCollapsed">
        <div class="user-info">
          <div class="user-avatar">
            <i class="bi bi-person-circle"></i>
          </div>
          <div class="user-details">
            <div class="user-name">مدیر</div>
            <div class="user-role">مدیر سیستم</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: 280px;
      background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%);
      color: white;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1000;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .sidebar.collapsed {
      width: 80px;
    }

    .sidebar-header {
      padding: 1.5rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 70px;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      overflow: hidden;
    }

    .logo-icon {
      font-size: 2rem;
      color: #fbbf24;
      flex-shrink: 0;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      white-space: nowrap;
      transition: opacity 0.3s;
    }

    .sidebar.collapsed .logo-text {
      opacity: 0;
      width: 0;
    }

    .toggle-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .toggle-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 0;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin: 0.25rem 0.5rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      padding: 0.875rem 1rem;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      border-radius: 10px;
      transition: all 0.2s;
      position: relative;
      gap: 0.75rem;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      transform: translateX(4px);
    }

    .nav-link.active {
      background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }

    .nav-link.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 60%;
      background: #fbbf24;
      border-radius: 0 4px 4px 0;
    }

    .nav-icon {
      font-size: 1.25rem;
      width: 24px;
      text-align: center;
      flex-shrink: 0;
    }

    .nav-text {
      flex: 1;
      white-space: nowrap;
      transition: opacity 0.3s;
    }

    .sidebar.collapsed .nav-text {
      opacity: 0;
      width: 0;
    }

    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.2);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      font-size: 2.5rem;
      color: rgba(255, 255, 255, 0.8);
    }

    .user-details {
      flex: 1;
      min-width: 0;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.6);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Scrollbar styling */
    .sidebar-nav::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar-nav::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    .sidebar-nav::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }

    .sidebar-nav::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }

      .sidebar.mobile-open {
        transform: translateX(0);
      }
    }
  `]
})
export class SidebarComponent implements OnInit {
  @Output() collapsedChange = new EventEmitter<boolean>();
  isCollapsed = false;
  
  navItems: NavItem[] = [
    { label: 'داشبورد', route: '/dashboard', icon: 'bi-speedometer2'},
    { label: 'افزودن شاگرد', route: '/add-student', icon: 'bi-person-plus' },
    { label: 'افزودن صنف', route: '/add-class', icon: 'bi-book' },
    { label: 'افزودن استاد', route: '/add-teacher', icon: 'bi-person-badge' },
    { label: 'افزودن مضمون', route: '/add-subject', icon: 'bi-journal-text' },
    { label: 'شاگردان', route: '/show-students', icon: 'bi-people' },
    { label: 'صنوف', route: '/show-classes', icon: 'bi-list-ul' },
    { label: 'اساتید', route: '/show-teachers', icon: 'bi-person-badge' },
    { label: 'مضامین', route: '/show-subjects', icon: 'bi-book' },
    { label: 'ثبت شاگرد', route: '/register-student', icon: 'bi-clipboard-check' },
    { label: 'ثبت‌نام‌ها', route: '/show-registered-students', icon: 'bi-check-circle' },
  ];

  ngOnInit() {
    // Check localStorage for collapsed state
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      this.isCollapsed = savedState === 'true';
      this.collapsedChange.emit(this.isCollapsed);
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebarCollapsed', String(this.isCollapsed));
    this.collapsedChange.emit(this.isCollapsed);
  }
}

