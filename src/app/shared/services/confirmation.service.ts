import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';

export interface ConfirmationOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  iconType?: 'warning' | 'danger' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private modalService: NgbModal) {}

  confirm(options: ConfirmationOptions): Observable<boolean> {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
      backdrop: true,
      keyboard: true,
      modalDialogClass: 'modern-confirm-modal',
      windowClass: 'modern-confirm-modal-window',
    });

    const component = modalRef.componentInstance as ConfirmModalComponent;
    component.title = options.title || 'Confirm Action';
    component.message = options.message;
    component.confirmText = options.confirmText || 'Confirm';
    component.cancelText = options.cancelText || 'Cancel';
    component.confirmButtonClass = options.confirmButtonClass || 'btn-danger';
    component.iconType = options.iconType || 'warning';

    return new Observable<boolean>((observer) => {
      modalRef.result.then(
        (result) => {
          observer.next(result === true);
          observer.complete();
        },
        () => {
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
}

