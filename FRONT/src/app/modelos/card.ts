import { Entidade } from "./entidade";
import { TipoCard } from "./enums/tipo-card";

export interface Card extends Entidade {
  codigo: string;
  titulo: string;
  conteudo: string;
  lista: TipoCard;
  somenteLeitura: boolean;
}
