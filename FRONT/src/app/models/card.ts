import { Entity } from "./entity";
import { CardType } from "./enums/card-type";

export interface Card extends Entity {
  titulo: string;
  conteudo: string;
  lista: CardType;
  editavel: boolean;
}
