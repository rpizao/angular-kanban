import { Entity } from "./entity";
import { CardType } from "./enums/card-type";

export interface Card extends Entity {
  titulo: string;
  conteudo: string;
  lista: CardType;
  editavel: boolean;

  // Campo usado para identificar o Card não persistido na view.
  code: string;
}
