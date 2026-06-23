import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-saldo',
  imports: [CommonModule],
  templateUrl: './card-saldo.html',
  styleUrl: './card-saldo.scss'
})
export class CardSaldo {
  @Input() saldo = 0;
  @Input() nomeUsuario = 'Usuário';

  get dataAtual(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = String(d.getFullYear()).slice(-2);
    return `${mes}/${ano}`;
  }
}