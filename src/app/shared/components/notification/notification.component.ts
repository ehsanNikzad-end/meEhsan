import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notification) => {
        if (notification) {
          this.notifications.push(notification);
          if (notification.duration) {
            setTimeout(() => {
              this.removeNotification(notification.id);
            }, notification.duration);
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }

  getNotificationClass(type: string): string {
    const classes: { [key: string]: string } = {
      success: 'alert-success',
      error: 'alert-danger',
      info: 'alert-info',
      warning: 'alert-warning',
    };
    return classes[type] || 'alert-info';
  }
}

