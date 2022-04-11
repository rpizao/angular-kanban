import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CardType } from './models/enums/card-type';
import { CardService } from './services/card.service';
import { Card } from './models/card';
import { AlertService } from './customs/alerts/alert.service';
import { TokenService } from './services/token.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement, Type } from '@angular/core';
import { HttpResourceService } from './customs/http/http-resource.service';
import { environment } from 'src/environments/environment';
import { findAllComponents, findComponent } from './components/tests/test.utils';
import { By } from "@angular/platform-browser";
import { CardComponent } from './components/card/card.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [HttpClientModule, HttpClientTestingModule],
				declarations: [AppComponent],
				providers: [CardService]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    let cards = [
      { titulo: "Todo 1", conteudo: "Conteudo Todo 1", lista: CardType.ToDo } as Card,
      { titulo: "Todo 2", conteudo: "Conteudo Todo 2", lista: CardType.ToDo } as Card,
      { titulo: "Todo 3", conteudo: "Conteudo Card 3", lista: CardType.ToDo } as Card,
      { titulo: "Doing 1", conteudo: "Conteudo Doing 1", lista: CardType.Doing } as Card,
      { titulo: "Done 1", conteudo: "Conteudo Done 1", lista: CardType.Done } as Card,
      { titulo: "Done 2", conteudo: "Conteudo Done 2", lista: CardType.Done } as Card,
    ];

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/cards`);
    req.flush(cards);
	});

  afterEach(() => {
    httpMock.verify();
  });


  it('Componente criado', () => {
    expect(component).toBeTruthy();
  });

  it('Verificando os tipos dos cards', () => {
    expect(component.listaTodo.length).toEqual(3);
    expect(component.listaDoing.length).toEqual(1);
    expect(component.listaDone.length).toEqual(2);
    fixture.detectChanges();

    const todoListItems = findAllComponents(fixture, ".todoItem");
    expect(todoListItems.length).toEqual(3);

    const doingListItems = findAllComponents(fixture, ".doingItem");
    expect(doingListItems.length).toEqual(1);

    const doneListItems = findAllComponents(fixture, ".doneItem");
    expect(doneListItems.length).toEqual(2);
  });

  it('Criar novo card para edição', () => {
    const add = findComponent(fixture, ".add");
    add.triggerEventHandler('click', null);

    expect(component.listaTodo.filter(c => c.editavel).length).toEqual(1);
    fixture.detectChanges();

    const todoListItems = findAllComponents(fixture, ".todoItem");
    let cardComponent = todoListItems[0].query(By.directive(CardComponent));

    const cancel = findComponent(cardComponent, ".cancel");
    cancel.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.listaTodo.filter(c => c.editavel).length).toEqual(1);
  });

  /* it('Copia',  fakeAsync( () => {
		fixture.detectChanges();
    tick();
  })); */



});
