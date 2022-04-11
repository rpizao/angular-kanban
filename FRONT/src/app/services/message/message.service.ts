import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Entity } from 'src/app/models/entity';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private subject = new Subject<Message>();

  cancel<T>(entity: T) {
    this.subject.next({ operation: MessageType.CANCEL, data: entity });
  }

  addOrUpdate<T>(entity: T) {
    this.subject.next({ operation: MessageType.ADD_OR_UPDATE, data: entity });
  }

  delete<T>(entity: T) {
    this.subject.next({ operation: MessageType.DELETE, data: entity });
  }

  edit<T>(entity: T) {
    this.subject.next({ operation: MessageType.EDIT, data: entity });
  }

  previous<T>(entity: T) {
    this.subject.next({ operation: MessageType.PREVIOUS, data: entity });
  }

  next<T>(entity: T) {
    this.subject.next({ operation: MessageType.NEXT, data: entity });
  }

  clearMessages() {
      this.subject.next();
  }

  onMessage(): Observable<Message> {
      return this.subject.asObservable();
  }
}

export interface Message {
  operation: MessageType;
  data?: any;
}

export enum MessageType {
  CANCEL, ADD_OR_UPDATE, EDIT, DELETE, PREVIOUS, NEXT
}
