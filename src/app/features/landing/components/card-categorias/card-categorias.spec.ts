import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCategorias } from './card-categorias';

describe('CardCategorias', () => {
  let component: CardCategorias;
  let fixture: ComponentFixture<CardCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCategorias],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCategorias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
