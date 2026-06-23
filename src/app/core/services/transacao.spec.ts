import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TransacaoService } from './transacao';

describe('TransacaoService', () => {
  let service: TransacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(TransacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});