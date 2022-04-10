import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/customs/alerts/alert.service';
import { HttpResourceService } from 'src/app/customs/http/http-resource.service';
import { Card } from '../models/card';
import { TipoCard } from '../models/enums/tipo-card';
import { HashUtils } from '../utils/hash.utils';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CardService extends HttpResourceService<Card> {

  private static readonly CARD_URL = "/cards";

  constructor(client: HttpClient, alert: AlertService, tokenService: TokenService){
    super(client, alert, tokenService);
  }

  get newInstance(): Card {
    return {
      codigo: HashUtils.hash(new Date().getTime().toString()),
      lista: TipoCard.ToDo
    } as Card;
  }

  add(card: Card, sucesso: (card: Card) => void){
    this.post(
      CardService.CARD_URL,
      {codigo: card.codigo, titulo: card.titulo, conteudo: card.conteudo},
      sucesso);
  }

  list(sucesso: (cards: Card[]) => void){
    this.get(CardService.CARD_URL, sucesso);
  }
}
