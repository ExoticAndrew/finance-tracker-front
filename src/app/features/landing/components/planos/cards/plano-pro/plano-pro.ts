import { Component } from '@angular/core';
import { AnimarAoEntrar } from '../../../../../../shared/directives/animar-ao-entrar';

@Component({
  selector: 'app-plano-pro',
  imports: [AnimarAoEntrar],
  templateUrl: './plano-pro.html',
  styleUrl: './plano-pro.scss',
})
export class PlanoPro {
  funcionalidades = [
    'Transações ilimitadas',
    'Todas as categorias',
    'Relatórios completos',
    'Exportar dados',
    'Suporte prioritário',
  ];
}