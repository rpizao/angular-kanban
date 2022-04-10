import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/customizacoes/alertas/alert.service';
import { HttpGenericoService } from 'src/app/customizacoes/http/http-generico.service';
import { Card } from '../modelos/card';
import { TipoCard } from '../modelos/enums/tipo-card';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CardService extends HttpGenericoService<Card> {

  private static readonly CARD_URL = "/cards";

  constructor(client: HttpClient, alert: AlertService, tokenService: TokenService){
    super(client, alert, tokenService);
  }

  protected get novaInstancia(): Card {
    return {
      lista: TipoCard.ToDo
    } as Card;
  }

  criar(card: Card, sucesso: (card: Card) => void){
    this.post(CardService.CARD_URL, {titulo: card.titulo, conteudo: card.conteudo}, sucesso);
  }

  listar(sucesso: (cards: Card[]) => void){
    this.get(CardService.CARD_URL, sucesso);
  }
}
