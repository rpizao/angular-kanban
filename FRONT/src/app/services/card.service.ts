import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/customs/alerts/alert.service';
import { HttpResourceService } from 'src/app/customs/http/http-resource.service';
import { Card } from '../models/card';
import { CardType } from '../models/enums/card-type';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class CardService extends HttpResourceService<Card> {

  private static readonly CARD_URL = "/cards";

  constructor(client: HttpClient, alert: AlertService, tokenService: TokenService){
    super(client, alert, tokenService);
  }


  newInstance(): Card {
    return {
      lista: CardType.ToDo
    } as Card;
  }

  add(card: Card, sucesso: (card: Card) => void){
    this.post(CardService.CARD_URL, card, sucesso);
  }

  update(card: Card, sucesso: (card: Card) => void){
    this.put(CardService.CARD_URL + '/' + card.id, card, sucesso);
  }

  list(sucesso: (cards: Card[]) => void){
    this.get(CardService.CARD_URL, sucesso);
  }

  remove(cardId: string, sucesso: (cards: Card[]) => void){
    this.delete(CardService.CARD_URL + '/' + cardId, sucesso);
  }
}
