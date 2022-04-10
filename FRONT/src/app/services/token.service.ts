import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from '../customs/alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private static readonly TOKEN = "token";

  constructor(private client: HttpClient, private alert: AlertService) { }

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
        sucesso();
      },
      error => {
        console.log(error);
        this.alert.error("Erro ao recuperar o token de acesso.")
      }
    );
  }

  /* async recuperarToken() {
    try {
      const token = await this.client.post(
        environment.apiBaseUrl + "/login", { "login":"letscode", "senha":"lets@123"}
      ).toPromise();
      this.setToken(token);
    } catch(error) {
      console.log(error);
      this.alert.error("Erro ao recuperar o token de acesso.")
    }
  } */
}
