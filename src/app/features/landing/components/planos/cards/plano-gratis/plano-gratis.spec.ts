import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoGratis } from './plano-gratis';

describe('PlanoGratis', () => {
  let component: PlanoGratis;
  let fixture: ComponentFixture<PlanoGratis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanoGratis],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanoGratis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
