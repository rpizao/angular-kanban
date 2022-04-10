import { HttpClient } from '@angular/common/http';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { Entidade } from 'src/app/modelos/entidade';
import { TokenService } from 'src/app/servicos/token.service';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alertas/alert.service';

export abstract class HttpGenericoService<T extends Entidade> {

  protected useLoading: boolean = true;

  constructor(private client: HttpClient, private alert: AlertService, private tokenService: TokenService){}

  protected abstract get novaInstancia(): T;

  protected getUrl():string{
    return environment.apiBaseUrl;
  }

  protected post<R>(partialUrl: string, body: any, then:(result: R) => void, fail?:(error: any) => void): void {
    let completeBody = this.novaInstancia;
    completeBody = {...body};
    this.prepararRequest(this.client.post<R>(this.getUrl() + partialUrl, instanceToPlain(completeBody)), then, fail);
  }

  protected get<R>(partialUrl: string, then:(result: R) => void, fail?:(error: any) => void): void {
    this.prepararRequest(this.client.get<R>(this.getUrl() + partialUrl), then, fail);
  }

  protected put<R>(partialUrl: string, body: any, then:(result: R) => void, fail?:(error: any) => void): void {
    this.prepararRequest(this.client.put<R>(this.getUrl() + partialUrl, instanceToPlain(body)), then, fail);
  }

  private prepararRequest<R>(observable: Observable<R>, then:(result: R) => void, fail?:(error: any) => void): void{
    this.chamarApi<R>(observable, then, fail);
  }

  protected chamarApi<R>(observable: Observable<R>, then:(result: R) => void, fail?:(error: any) => void){
    observable.subscribe(
      (result: R) => {
        then(result);
      },
      error => {
        if(error.status === 401) {
          this.tokenService.recuperarToken(() => this.chamarApi<R>(observable, then, fail));
          return;
        }

        console.log(error);
        if(!fail) this.alert.warn("Ocorreu um erro!<br>Caso se repita, entre em contato com o responsável.")
        else fail(error);
      }
    );
  }
}
