import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'platform',
})
export class EventService {
  private subject = new Subject<{ eventName: string; payload: any }>();

  emit(eventName: string, payload: any) {
    this.subject.next({ eventName, payload });
  }

  listen<T = any>(eventName: string, callback: (payload: T) => void) {
    this.subject.subscribe(({ eventName: emittedName, payload }) => {
      if (emittedName === eventName) {
        callback(payload);
      }
    });
  }
}

export default new EventService();
