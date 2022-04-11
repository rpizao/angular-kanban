import { HttpClient } from '@angular/common/http';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { Entity } from 'src/app/models/entity';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

export abstract class HttpResourceService<T extends Entity> {

  protected useLoading: boolean = true;

  constructor(private client: HttpClient, private alert: AlertService, private tokenService: TokenService){}

  protected abstract newInstance(): T;

  protected getUrl():string{
    return environment.apiBaseUrl;
  }

  protected post<R>(partialUrl: string, body: any, then:(result: R) => void, fail?:(error: any) => void): void {
    let completeBody = this.newInstance;
    completeBody = {...body};
    this.prepareRequest(this.client.post<R>(this.getUrl() + partialUrl, instanceToPlain(completeBody)), then, fail);
  }

  protected get<R>(partialUrl: string, then:(result: R) => void, fail?:(error: any) => void): void {
    this.prepareRequest(this.client.get<R>(this.getUrl() + partialUrl), then, fail);
  }

  protected put<R>(partialUrl: string, body: any, then:(result: R) => void, fail?:(error: any) => void): void {
    this.prepareRequest(this.client.put<R>(this.getUrl() + partialUrl, instanceToPlain(body)), then, fail);
  }

  protected delete<R>(partialUrl: string, then:(result: R) => void, fail?:(error: any) => void): void {
    this.prepareRequest(this.client.delete<R>(this.getUrl() + partialUrl), then, fail);
  }

  private prepareRequest<R>(observable: Observable<R>, then:(result: R) => void, fail?:(error: any) => void): void{
    this.apiCall<R>(observable, then, fail);
  }

  protected apiCall<R>(observable: Observable<R>, then:(result: R) => void, fail?:(error: any) => void){
    observable.subscribe(
      (result: R) => {
        then(result);
      },
      error => {
        if(error.status === 401) {
          this.tokenService.recuperarToken(() => this.apiCall<R>(observable, then, fail));
          return;
        }

        console.log(error);
        if(!fail) this.alert.error("Ocorreu um erro! Caso se repita, entre em contato com o responsável.")
        else fail(error);
      }
    );
  }
}
