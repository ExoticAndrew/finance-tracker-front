import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventosService {
  private _transacaoAtualizada = new Subject<void>();
  
  transacaoAtualizada$ = this._transacaoAtualizada.asObservable();

  notificarAtualizacao(): void {
    this._transacaoAtualizada.next();
  }
}