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
import { findAllComponents, findComponent, mockRequest } from './components/tests/test.utils';
import { By } from "@angular/platform-browser";
import { CardComponent } from './components/card/card.component';
import { CardReadonlyComponent } from './components/card-readonly/card-readonly.component';
import { MessageService } from './services/message/message.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  let messageService: MessageService;
  let cards: Card[];

  beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [HttpClientModule, HttpClientTestingModule],
				declarations: [AppComponent],
				providers: [CardService, MessageService]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);

    cards = [
      { id: "1", titulo: "Todo 1", conteudo: "Conteudo Todo 1", lista: CardType.ToDo } as Card,
      { id: "2", titulo: "Todo 2", conteudo: "Conteudo Todo 2", lista: CardType.ToDo } as Card,
      { id: "3", titulo: "Todo 3", conteudo: "Conteudo Card 3", lista: CardType.ToDo } as Card,
      { id: "4", titulo: "Doing 1", conteudo: "Conteudo Doing 1", lista: CardType.Doing } as Card,
      { id: "5", titulo: "Done 1", conteudo: "Conteudo Done 1", lista: CardType.Done } as Card,
      { id: "6", titulo: "Done 2", conteudo: "Conteudo Done 2", lista: CardType.Done } as Card,
    ];

    mockRequest(httpMock, 'cards', cards);
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
    fixture.detectChanges();

    // Somente um card editável
    expect(component.listaTodo.filter(c => c.editavel).length).toEqual(1);
  });

  it('Editar o primeiro card da lista de TODO', () => {
    fixture.detectChanges();

    // Itens na fileira de TODO para edição
    let todoListEdit = findAllComponents(fixture, ".todoItem .editable");
    expect(todoListEdit.length).toEqual(0);
    // e somente leitura
    const todoListReadOnly = findAllComponents(fixture, ".todoItem .readonly");
    expect(todoListReadOnly.length).toEqual(3);

    // Editando o primeiro item da lista
    messageService.edit(component.listaTodo[0]);
    fixture.detectChanges();
    todoListEdit = findAllComponents(fixture, ".todoItem .editable");
    expect(todoListEdit.length).toEqual(1);
  });

  it('Adicionando novo card na lista de TODO e editando outro item, que já estava na lista', () => {
    const add = findComponent(fixture, ".add");
    add.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Somente um card editável
    expect(component.listaTodo.filter(c => c.editavel).length).toEqual(1);

    // Itens na fileira de TODO para edição
    let todoListEdit = findAllComponents(fixture, ".todoItem .editable");
    expect(todoListEdit.length).toEqual(1);
    // e somente leitura
    const todoListReadOnly = findAllComponents(fixture, ".todoItem .readonly");
    expect(todoListReadOnly.length).toEqual(3);

    // Editando o terceiro item da lista
    messageService.edit(component.listaTodo[2]);
    fixture.detectChanges();
    todoListEdit = findAllComponents(fixture, ".todoItem .editable");
    expect(todoListEdit.length).toEqual(2);
  });

  it('Avançando o segundo card da lista de TODO para DOING', () => {
    fixture.detectChanges();

    // Itens na fileira de TODO
    let todoList = findAllComponents(fixture, ".todoItem");
    expect(todoList.length).toEqual(3);

    // Itens na fileira de DOING
    let doingList = findAllComponents(fixture, ".doingItem");
    expect(doingList.length).toEqual(1);

    // Movendo o segundo item da lista de TODO para DOING
    const secondTodoItem = component.listaTodo[1];
    messageService.next(secondTodoItem);
    mockRequest(httpMock, 'cards/' + secondTodoItem.id, secondTodoItem);

    const updatedCards = cards.map(c => {
      if(c.id == "2") c.lista = CardType.Doing;
      return c;
    });
    mockRequest(httpMock, 'cards', updatedCards);
    fixture.detectChanges();

    todoList = findAllComponents(fixture, ".todoItem");
    expect(todoList.length).toEqual(2);

    doingList = findAllComponents(fixture, ".doingItem");
    expect(doingList.length).toEqual(2);
  });

  it('Avançando o último card da lista de DOING para DONE', () => {
    fixture.detectChanges();

    // Itens na fileira de TODO
    let doingList = findAllComponents(fixture, ".doingItem");
    expect(doingList.length).toEqual(1);

    // Itens na fileira de DOING
    let doneList = findAllComponents(fixture, ".doneItem");
    expect(doneList.length).toEqual(2);

    // Movendo o último item da lista de DOING para DONE
    const lastDoingItem = component.listaDoing[component.listaDoing.length - 1];
    messageService.next(lastDoingItem);
    mockRequest(httpMock, 'cards/' + lastDoingItem.id, lastDoingItem);

    const updatedCards = cards.map(c => {
      if(c.id == lastDoingItem.id) c.lista = CardType.Done;
      return c;
    });
    mockRequest(httpMock, 'cards', updatedCards);
    fixture.detectChanges();

    doingList = findAllComponents(fixture, ".doingItem");
    expect(doingList.length).toEqual(0);

    doneList = findAllComponents(fixture, ".doneItem");
    expect(doneList.length).toEqual(3);
  });

  it('Retornando o primeiro card da lista de DONE para DOING', () => {
    fixture.detectChanges();

    // Itens na fileira de TODO
    let doneList = findAllComponents(fixture, ".doneItem");
    expect(doneList.length).toEqual(2);

    // Itens na fileira de DOING
    let doingList = findAllComponents(fixture, ".doingItem");
    expect(doingList.length).toEqual(1);

    // Retornando o primeiro item da lista de DONE para DOING
    const firstDoneItem = component.listaDone[0];
    messageService.previous(firstDoneItem);
    mockRequest(httpMock, 'cards/' + firstDoneItem.id, firstDoneItem);

    const updatedCards = cards.map(c => {
      if(c.id == firstDoneItem.id) c.lista = CardType.Doing;
      return c;
    });
    mockRequest(httpMock, 'cards', updatedCards);
    fixture.detectChanges();

    doingList = findAllComponents(fixture, ".doingItem");
    expect(doingList.length).toEqual(2);

    doneList = findAllComponents(fixture, ".doneItem");
    expect(doneList.length).toEqual(1);
  });

});
