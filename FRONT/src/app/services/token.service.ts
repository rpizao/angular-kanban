import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from '../customs/alerts/alert.service';
import { CardService } from './card.service';
import { SampleService } from './sample.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private static readonly TOKEN = "token";

  constructor(private client: HttpClient, private alert: AlertService, private sampleService: SampleService) { }

  getToken(): any {
    return localStorage.getItem(TokenService.TOKEN);
  }

  setToken(value: any) {
    localStorage.setItem(TokenService.TOKEN, value);
  }

  recuperarToken(sucesso: () => void) {
    this.client.post(
      environment.apiBaseUrl + "/login", { "login":"letscode", "senha":"lets@123"}
    ).subscribe(
      token => {
        this.setToken(token);

        // Carregar alguns cards de exemplo no primeiro login.
        this.sampleService.loadingSamples().then(r => sucesso());
      },
      error => {
        console.log(error);
        this.alert.error("Erro ao recuperar o token de acesso.")
      }
    );
  }
}
