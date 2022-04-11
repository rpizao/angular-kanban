import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertService } from '../customs/alerts/alert.service';

import { CardService } from './card.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [AlertService]
    });
    service = TestBed.inject(CardService);
  });

  it('Serviço inicializado', () => {
    expect(service).toBeTruthy();
  });
});
