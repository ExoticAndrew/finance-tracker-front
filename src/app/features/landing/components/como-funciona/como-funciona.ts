import { Component } from '@angular/core';
import { LucideAngularModule, UserPlus, Wallet, BarChart3 } from 'lucide-angular';

@Component({
  selector: 'app-como-funciona',
  imports: [LucideAngularModule],
  templateUrl: './como-funciona.html',
  styleUrl: './como-funciona.scss',
})
export class ComoFunciona {
  readonly UserPlus = UserPlus;
  readonly Wallet = Wallet;
  readonly BarChart3 = BarChart3;
}