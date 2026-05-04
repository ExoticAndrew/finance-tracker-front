import { Component } from '@angular/core';
import { LucideAngularModule, UserPlus, Wallet, BarChart3 } from 'lucide-angular';
import { AnimarAoEntrar } from '../../../../shared/directives/animar-ao-entrar';

@Component({
  selector: 'app-como-funciona',
  imports: [LucideAngularModule, AnimarAoEntrar],
  templateUrl: './como-funciona.html',
  styleUrl: './como-funciona.scss',
})
export class ComoFunciona {
  readonly UserPlus = UserPlus;
  readonly Wallet = Wallet;
  readonly BarChart3 = BarChart3;
}