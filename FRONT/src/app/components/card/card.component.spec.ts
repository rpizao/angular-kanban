import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [HttpClientModule, MatDialogModule, ReactiveFormsModule],
				declarations: [CardComponent],
				providers: [CardService]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CardComponent);
		component = fixture.componentInstance;
	});

  it('Componente criado', () => {
    expect(component).toBeTruthy();
  });

  it('Submit de um formulário inválido', () => {
    component.confirm();
    expect(component.formulario.invalid).toBeTrue();
  });

  it('Submit de um formulário válido', () => {
    component.formulario.patchValue({titulo: 'Titulo', conteudo: 'Conteudo'} as Card);
    component.confirm();
    expect(component.formulario.valid).toBeTrue();
  });
});
