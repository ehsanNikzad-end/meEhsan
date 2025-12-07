import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() confirmButtonClass: string = 'btn-danger';
  @Input() iconType: 'warning' | 'danger' | 'info' = 'warning';

  get iconClass(): string {
    const iconMap = {
      warning: 'bi-exclamation-triangle-fill',
      danger: 'bi-x-octagon-fill',
      info: 'bi-info-circle-fill',
    };
    return iconMap[this.iconType] || iconMap.warning;
  }

  get iconCircleClass(): string {
    return this.iconClass;
  }

  constructor(public activeModal: NgbActiveModal) {}

  confirm(): void {
    this.activeModal.close(true);
  }

  dismiss(): void {
    this.activeModal.dismiss(false);
  }
}
