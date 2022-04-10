import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReadonlyComponent } from './card-readonly.component';

describe('CardReadonlyComponent', () => {
  let component: CardReadonlyComponent;
  let fixture: ComponentFixture<CardReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
