import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenIntercept implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
    ) { }


    private montarHeaderAutorizacao(): any {
      const token = this.tokenService.getToken();

      return {
        Authorization : 'Bearer ' + token,
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      };
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const headers = this.montarHeaderAutorizacao();
      const requestComHeaderModificado = request.clone({ setHeaders: headers });
      return next.handle(requestComHeaderModificado);
    }
}
