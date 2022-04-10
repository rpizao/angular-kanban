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

  private static readonly NAVIGATION_LIST = new Map<CardType, {previous?: CardType, next?: CardType}>([
    [CardType.ToDo, { next: CardType.Doing }],
    [CardType.Doing, { previous: CardType.ToDo, next: CardType.Done }],
    [CardType.Done, { previous: CardType.Doing }]
  ]);

  @Input()
  data: Card | undefined;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  private getPrevious(): CardType | undefined {
    if(!this.data) return undefined;
    return CardReadonlyComponent.NAVIGATION_LIST.get(this.data.lista)?.previous;
  }

  private getNext(): CardType | undefined {
    if(!this.data) return undefined;
    return CardReadonlyComponent.NAVIGATION_LIST.get(this.data.lista)?.next;
  }

  hasPreviousOption(): boolean {
    return this.getPrevious() != null;
  }

  hasNextOption(): boolean {
    return this.getNext() != null;
  }

  remove() {
    this.messageService.delete(this.data);
  }

  previous() {
    this.messageService.addOrUpdate({...this.data, lista: this.getPrevious()});
  }

  next() {
    this.messageService.addOrUpdate({...this.data, lista: this.getNext()});
  }

  edit() {
    this.messageService.edit(this.data);
  }

}
