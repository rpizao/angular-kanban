import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AlertService } from './customs/alerts/alert.service';
import { BusinessError } from './exceptions/business.error';
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
export class AppComponent {

  private static readonly NAVIGATION_LIST = new Map<CardType, {previous?: CardType, next?: CardType}>([
    [CardType.ToDo, { next: CardType.Doing }],
    [CardType.Doing, { previous: CardType.ToDo, next: CardType.Done }],
    [CardType.Done, { previous: CardType.Doing }]
  ]);

  @ViewChildren('todoCard', { read: ElementRef }) private todoListItems?: QueryList<ElementRef>;

  constructor(private cardService: CardService, private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef, private alert: AlertService) {
    this.loadingCardList();
    this.messageService.onMessage().subscribe(message => this.stateChangeComponent(message));
  }

  private _listaTodo: Card[] = [];
  private _listaDoing: Card[] = [];
  private _listaDone: Card[] = [];

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
    let newCard = {...this.cardService.newInstance(), code: HashUtils.hash()};
    this._listaTodo.push(newCard);
    this.messageService.edit(newCard);
  }

  private scrollToEnd(){
    this.changeDetectorRef.detectChanges();

    if(!this.todoListItems) return;
    const lastElement = this.todoListItems.last;
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

  private openCardToEdition(card: Card) {
    card.editavel = true;
    if(!card.id) this.scrollToEnd();
  }

  private cancelCardEdition(card: Card) {
    if(card.id) card.editavel = false;
    else this.clearCardEditionByCode(card);
  }

  private addOrUpdateAndRefreshList(card: Card){
    if(card.id) this.cardService.update(card, sucesso => this.loadingCardList());
    else this.cardService.add(card, sucesso => this.loadingCardList());
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
      case MessageType.CANCEL: this.cancelCardEdition(message.data as Card); break;
      case MessageType.ADD_OR_UPDATE: this.addOrUpdateAndRefreshList(message.data as Card); break;
      case MessageType.EDIT: this.openCardToEdition(message.data as Card); break;
      case MessageType.DELETE: this.deleteAndRefreshList(message.data as Card); break;
      case MessageType.PREVIOUS: this.goToPrevious(message.data as Card); break;
      case MessageType.NEXT: this.goToNext(message.data as Card); break;
    }
  }

  private goToPrevious(card: Card) {
    let previous = AppComponent.NAVIGATION_LIST.get(card.lista)?.previous;
    if(!previous) {
      this.alert.error(`Erro ao mover o card ${card.titulo} para próxima anterior.`);

      throw new BusinessError(
        `Card ${card.titulo} não pode retornar para lista anterior.
        Provavelmente, a lista não existe (o card está na lista de Todo) ou o tipo informado é desconhecido.`);
    }
    this.addOrUpdateAndRefreshList({...card, lista: previous});
  }

  private goToNext(card: Card) {
    let next = AppComponent.NAVIGATION_LIST.get(card.lista)?.next;
    if(!next) {
      this.alert.error(`Erro ao mover o card ${card.titulo} para próxima lista.`);

      throw new BusinessError(
        `Card ${card.titulo} não pode seguir para próxima lista.
        Provavelmente, a lista não existe (o card está na lista de Done) ou o tipo informado é desconhecido.`);
    }
    this.addOrUpdateAndRefreshList({...card, lista: next});
  }

}
