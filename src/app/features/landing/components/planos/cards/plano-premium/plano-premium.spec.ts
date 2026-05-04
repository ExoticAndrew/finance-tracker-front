import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoPremium } from './plano-premium';

describe('PlanoPremium', () => {
  let component: PlanoPremium;
  let fixture: ComponentFixture<PlanoPremium>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanoPremium],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanoPremium);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
