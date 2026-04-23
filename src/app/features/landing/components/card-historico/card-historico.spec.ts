import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHistorico } from './card-historico';

describe('CardHistorico', () => {
  let component: CardHistorico;
  let fixture: ComponentFixture<CardHistorico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHistorico],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHistorico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
