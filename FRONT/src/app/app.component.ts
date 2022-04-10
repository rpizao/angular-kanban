import { Component, OnInit } from '@angular/core';
import { Card } from './models/card';
import { CardType } from './models/enums/card-type';
import { CardService } from './services/card.service';
import { Message, MessageService, MessageType } from './services/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private cardService: CardService, private messageService: MessageService) {}

  private _listaTodo: Card[] = [];
  private _listaDoing: Card[] = [];
  private _listaDone: Card[] = [];

  ngOnInit(): void {
    this.loadingCardList();

    this.messageService.onMessage().subscribe(message => this.stateChangeComponent(message));
  }

  get listaTodo(): Card[] {
    return this._listaTodo;
  }

  get listaDoing(): Card[] {
    return this._listaDoing;
  }

  get listaDone(): Card[] {
    return this._listaDone;
  }

  addTodo() {
    this._listaTodo.push({...this.cardService.newInstance()});
  }

  private loadingCardList() {
    this.cardService.list(result => {
      this._listaTodo = this.filterListByCardType(result, CardType.ToDo);
      this._listaDoing = this.filterListByCardType(result, CardType.Doing);
      this._listaDone = this.filterListByCardType(result, CardType.Done);
    });
  }

  private clearCardEdition(card: Card) {
    switch(card.lista){
      case CardType.ToDo: this._listaTodo = this.removeListById(this._listaTodo, card.id); break;
      case CardType.Doing: this._listaDoing = this.removeListById(this._listaDoing, card.id); break;
      case CardType.Done: this._listaDone = this.removeListById(this._listaDone, card.id); break;
    }
  }

  private cancelCardEdition(card: Card) {
    if(!card.id) {
      this.clearCardEdition(card);
      return;
    }
    card.editavel = false;
  }

  private addOrUpdateAndRefreshList(card: Card){
    if(card.id) this.cardService.update(card, sucesso => this.loadingCardList());
    else this.cardService.add(card, sucesso => this.loadingCardList());
  }

  private openCardToEdition(card: Card) {
    card.editavel = true;
  }

  private deleteAndRefreshList(card: Card){
    this.cardService.remove(card.id, sucesso => this.loadingCardList());
  }

  private filterListByCardType(list: Card[], type: CardType): Card[] {
    if(!list) return [];
    return list.filter(i => i.lista == type);
  }

  private removeListById(list: Card[], id: string): Card[] {
    if(!list) return [];
    return list.filter(i => i.id != id);
  }

  private stateChangeComponent(message: Message){
    switch(message.operation){
      case MessageType.CLEAR: this.cancelCardEdition(message.data as Card); break;
      case MessageType.ADD_OR_UPDATE: this.addOrUpdateAndRefreshList(message.data as Card); break;
      case MessageType.EDIT: this.openCardToEdition(message.data as Card); break;
      case MessageType.DELETE: this.deleteAndRefreshList(message.data as Card); break;
    }
  }

}
