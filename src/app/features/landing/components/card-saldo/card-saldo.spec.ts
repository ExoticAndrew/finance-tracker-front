import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSaldo } from './card-saldo';

describe('CardSaldo', () => {
  let component: CardSaldo;
  let fixture: ComponentFixture<CardSaldo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSaldo],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSaldo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
