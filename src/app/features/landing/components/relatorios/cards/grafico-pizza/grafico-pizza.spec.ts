import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPizza } from './grafico-pizza';

describe('GraficoPizza', () => {
  let component: GraficoPizza;
  let fixture: ComponentFixture<GraficoPizza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoPizza],
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoPizza);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
