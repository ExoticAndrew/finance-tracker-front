import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoPro } from './plano-pro';

describe('PlanoPro', () => {
  let component: PlanoPro;
  let fixture: ComponentFixture<PlanoPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanoPro],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanoPro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
