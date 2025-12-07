import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { getUserFriendlyErrorMessage } from '../utils/error-messages.util';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private toastr: ToastrService) {}

  success(message: string) {
    this.toastr.success(message, 'موفقیت');
  }

  error(message: string, title: string = 'خطا') {
    this.toastr.error(message, title);
  }

  info(message: string) {
    this.toastr.info(message, 'اطلاعات');
  }

  warning(message: string) {
    this.toastr.warning(message, 'هشدار');
  }

  showError(err: any, entityName: string = 'item') {
    const errorMessage = getUserFriendlyErrorMessage(err, entityName);
    this.error(errorMessage);
  }
}



