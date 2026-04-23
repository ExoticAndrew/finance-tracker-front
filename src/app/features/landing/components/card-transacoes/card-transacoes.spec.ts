import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTransacoes } from './card-transacoes';

describe('CardTransacoes', () => {
  let component: CardTransacoes;
  let fixture: ComponentFixture<CardTransacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTransacoes],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTransacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
