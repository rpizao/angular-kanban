import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { CardType } from 'src/app/models/enums/card-type';
import { CardService } from 'src/app/services/card.service';
import { CardReadonlyComponent } from './card-readonly.component';

describe('CardReadonlyComponent', () => {
  let component: CardReadonlyComponent;
  let fixture: ComponentFixture<CardReadonlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CardReadonlyComponent ],
      imports: [HttpClientModule, MatDialogModule, ReactiveFormsModule],
      providers: [CardService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente criado', () => {
    expect(component).toBeTruthy();
  });

  it('Removendo card', () => {
    component.data = { titulo: "Todo 1", conteudo: "Conteudo Todo 1", lista: CardType.ToDo } as Card;
    component.remove();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.data.editavel).toBeFalse();
  });

  it('Indo para lista anterior', () => {
    component.data = { titulo: "Todo 1", conteudo: "Conteudo Todo 1", lista: CardType.Doing } as Card;
    component.previous();
    expect(component).toBeTruthy();
    expect(component.data.lista).toEqual(CardType.ToDo);
  });

  it('Indo para a próxima lista', () => {
    component.data = { titulo: "Todo 1", conteudo: "Conteudo Todo 1", lista: CardType.ToDo } as Card;
    component.next();
    expect(component).toBeTruthy();
    expect(component.data.lista).toEqual(CardType.Doing);
  });

  it('Editar o card', () => {
    component.data = { titulo: "Todo 1", conteudo: "Conteudo Todo 1", lista: CardType.ToDo } as Card;
    component.edit();
    expect(component).toBeTruthy();
    expect(component.data.editavel).toBeTrue();
  });

});
