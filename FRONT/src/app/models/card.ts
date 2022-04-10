import { Entity } from "./entidade";
import { TipoCard } from "./enums/tipo-card";

export interface Card extends Entity {
  titulo: string;
  conteudo: string;
  lista: TipoCard;
  somenteLeitura: boolean;
}
