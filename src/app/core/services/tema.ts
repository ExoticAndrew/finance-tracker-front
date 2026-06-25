import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TemaService {
  private readonly CHAVE = 'tema';

  // signal pra qualquer componente saber qual tema tá ativo
  tema = signal<'escuro' | 'claro'>('escuro');

  constructor() {
    // ao iniciar, lê o tema salvo (ou usa escuro como padrão)
    const salvo = localStorage.getItem(this.CHAVE) as 'escuro' | 'claro' | null;
    this.definir(salvo ?? 'escuro');
  }

  alternar(): void {
    this.definir(this.tema() === 'escuro' ? 'claro' : 'escuro');
  }

  private definir(tema: 'escuro' | 'claro'): void {
    this.tema.set(tema);
    
    document.documentElement.setAttribute('data-tema', tema);
    localStorage.setItem(this.CHAVE, tema);
  }
}