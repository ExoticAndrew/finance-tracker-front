import { Component } from '@angular/core';
import { AnimarAoEntrar } from '../../../../../../shared/directives/animar-ao-entrar';

@Component({
  selector: 'app-plano-premium',
  imports: [AnimarAoEntrar],
  templateUrl: './plano-premium.html',
  styleUrl: './plano-premium.scss',
})
export class PlanoPremium {
  funcionalidades = [
    'Tudo do Pro',
    'Suporte 24/7',
    'Acesso antecipado',
    'Relatórios personalizados',
    'IA para análise financeira',
  ];
}