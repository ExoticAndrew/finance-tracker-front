import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStats } from './login-stats';

describe('LoginStats', () => {
  let component: LoginStats;
  let fixture: ComponentFixture<LoginStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginStats],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
