import { Component, OnInit } from '@angular/core';
import { Card } from './modelos/card';
import { TipoCard } from './modelos/enums/tipo-card';
import { CardService } from './servicos/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private cardService: CardService) {}

  private _listaTodo: Card[] = [];
  private _listaDoing: Card[] = [];
  private _listaDone: Card[] = [];

  ngOnInit(): void {
    this.cardService.listar(result => {
      this._listaTodo = this.filtrarListaPorTipo(result, TipoCard.ToDo);
      this._listaDoing = this.filtrarListaPorTipo(result, TipoCard.Doing);
      this._listaDone = this.filtrarListaPorTipo(result, TipoCard.Done);
    });
  }

  private filtrarListaPorTipo(listaCards: Card[], tipoCard: TipoCard): Card[]{
    if(!listaCards) return [];
    return listaCards.filter(c => c.lista == tipoCard);
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

}
