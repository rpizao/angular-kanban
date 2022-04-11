import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardType as CardType } from 'src/app/models/enums/card-type';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-card-readonly',
  templateUrl: './card-readonly.component.html',
  styleUrls: ['./card-readonly.component.scss']
})
export class CardReadonlyComponent implements OnInit {

  @Input()
  data: Card | undefined;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  hasPreviousOption(): boolean {
    return this.data?.lista != CardType.ToDo;
  }

  hasNextOption(): boolean {
    return this.data?.lista != CardType.Done;
  }

  remove() {
    this.messageService.delete(this.data);
  }

  previous() {
    this.messageService.previous({...this.data});
  }

  next() {
    this.messageService.next({...this.data});
  }

  edit() {
    this.messageService.edit(this.data);
  }

}
