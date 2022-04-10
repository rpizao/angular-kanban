import { ViewportScroller } from '@angular/common';
import { AfterContentChecked, AfterViewChecked, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Card } from './models/card';
import { CardType } from './models/enums/card-type';
import { CardService } from './services/card.service';
import { Message, MessageService, MessageType } from './services/message/message.service';
import { HashUtils } from './utils/hash.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  @ViewChildren('todoItem', { read: ElementRef }) private todoListContainer?: QueryList<ElementRef>;

  constructor(private cardService: CardService, private messageService: MessageService, private viewportScroller: ViewportScroller) {
    this.loadingCardList();
    this.messageService.onMessage().subscribe(message => this.stateChangeComponent(message));
  }
  ngAfterViewChecked(): void {
    this.scrollToEnd();
  }

  private _listaTodo: Card[] = [];
  private _listaDoing: Card[] = [];
  private _listaDone: Card[] = [];

  ngOnInit(): void {

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
    this._listaTodo.push({...this.cardService.newInstance(), code: HashUtils.hash()});
  }

  ngAfterContentChecked(): void {

  }

  private scrollToEnd(){
    if(!this.todoListContainer) return;
    const lastElement = this.todoListContainer.last;
    if(lastElement) lastElement.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  private loadingCardList() {
    this.cardService.list(result => {
      this._listaTodo = this.filterListByCardType(result, CardType.ToDo);
      this._listaDoing = this.filterListByCardType(result, CardType.Doing);
      this._listaDone = this.filterListByCardType(result, CardType.Done);
    });
  }

  private clearCardEditionByCode(card: Card) {
    switch(card.lista){
      case CardType.ToDo: this._listaTodo = this.removeListByCode(this._listaTodo, card.code); break;
      case CardType.Doing: this._listaDoing = this.removeListByCode(this._listaDoing, card.code); break;
      case CardType.Done: this._listaDone = this.removeListByCode(this._listaDone, card.code); break;
    }
  }

  private cancelCardEdition(card: Card) {
    if(!card.id) {
      this.clearCardEditionByCode(card);
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

  private removeListByCode(list: Card[], code: string): Card[] {
    if(!list) return [];
    return list.filter(i => i.code != code);
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
