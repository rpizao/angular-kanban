import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertService } from '../customs/alerts/alert.service';
import { SampleService } from './sample.service';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
      providers: [AlertService, SampleService]
    });
    service = TestBed.inject(TokenService);
  });

  it('Serviço inicializado', () => {
    expect(service).toBeTruthy();
  });
});
