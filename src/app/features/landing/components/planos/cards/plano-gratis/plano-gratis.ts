import { Component } from '@angular/core';
import { AnimarAoEntrar } from '../../../../../../shared/directives/animar-ao-entrar';

@Component({
  selector: 'app-plano-gratis',
  imports: [AnimarAoEntrar],
  templateUrl: './plano-gratis.html',
  styleUrl: './plano-gratis.scss',
})
export class PlanoGratis {
  funcionalidades = [
    'Até 50 transações por mês',
    'Categorias básicas',
    'Relatórios simples',
    'Suporte por email',
  ];
}