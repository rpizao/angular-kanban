import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
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

});
