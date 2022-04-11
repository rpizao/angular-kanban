import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import samples from '../../assets/resources.json';
import { Card } from '../models/card';

/**
 * Classe de conveniência.
 * Criada para carregar algumas amostras e facilitar a identificação dos recursos implementados.
 */
@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private client: HttpClient){ }

  async loadingSamples() {
    const cards = (await this.client.get(`${environment.apiBaseUrl}/cards`).toPromise()) as Card[];
    if(cards?.length > 0) return;

    for (const s of samples) {
      const card = {
        titulo: s.titulo,
        lista: s.lista,
        conteudo: s.conteudo.join("\r\n")
      } as Card;

      await this.client.post(`${environment.apiBaseUrl}/cards`, card).toPromise();
    }
  }
}
