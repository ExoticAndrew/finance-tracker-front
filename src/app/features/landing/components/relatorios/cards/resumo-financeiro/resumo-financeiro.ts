import { Component } from '@angular/core';
import { AnimarAoEntrar } from '../../../../../../shared/directives/animar-ao-entrar';

@Component({
  selector: 'app-resumo-financeiro',
  imports: [AnimarAoEntrar],
  templateUrl: './resumo-financeiro.html',
  styleUrl: './resumo-financeiro.scss',
})
export class ResumoFinanceiro {
  resumo = {
    receitas: 4300.00,
    despesas: 1452.90,
    saldo: 2847.10,
    economia: 33.7
  };

  formatar(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}