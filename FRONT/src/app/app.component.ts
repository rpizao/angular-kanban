import { Component, OnInit } from '@angular/core';
import { Card } from './models/card';
import { Entity } from './models/entidade';
import { TipoCard } from './models/enums/tipo-card';
import { CardService } from './services/card.service';
import { MessageService, TypeMessage } from './services/message/message.service';

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
    this.cardService.list(result => {
      this._listaTodo = this.filterListByTipoCard(result, TipoCard.ToDo);
      this._listaDoing = this.filterListByTipoCard(result, TipoCard.Doing);
      this._listaDone = this.filterListByTipoCard(result, TipoCard.Done);
    });

    this.messageService.onMessage().subscribe(message => {
      if(message.operation == TypeMessage.CLEAR) this.clearCardEdition(message.data as Card);
    });
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
    this._listaTodo.push({...this.cardService.newInstance});
  }

  private clearCardEdition(card: Card) {
    switch(card.lista){
      case TipoCard.ToDo: this._listaTodo = this.filterListByCodigo(this._listaTodo, card.codigo); break;
      case TipoCard.Doing: this._listaDoing = this.filterListByCodigo(this._listaDoing, card.codigo); break;
      case TipoCard.Done: this._listaDone = this.filterListByCodigo(this._listaTodo, card.codigo); break;
    }
  }

  private filterListByTipoCard(list: Card[], tipoCard: TipoCard): Card[] {
    if(!list) return [];
    return list.filter(i => i.lista == tipoCard);
  }

  private filterListByCodigo(list: Card[], codigo: string): Card[] {
    if(!list) return [];
    return list.filter(i => i.codigo == codigo);
  }



}
