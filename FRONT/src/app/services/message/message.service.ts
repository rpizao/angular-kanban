import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Entity } from 'src/app/models/entidade';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subject = new Subject<Message>();

    clear(entity: Entity) {
      this.subject.next({ operation: TypeMessage.CLEAR, data: entity });
    }

    update(entity: Entity) {
      this.subject.next({ operation: TypeMessage.UPDATE, data: entity });
    }

    delete(entity: Entity) {
      this.subject.next({ operation: TypeMessage.DELETE, data: entity });
    }

    clearMessages() {
        this.subject.next();
    }

    onMessage(): Observable<Message> {
        return this.subject.asObservable();
    }
}

export interface Message {
  operation: TypeMessage;
  data: Entity;
}

export enum TypeMessage {
  CLEAR, UPDATE, DELETE
}
