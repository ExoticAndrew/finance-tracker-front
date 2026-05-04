import { Component } from '@angular/core';
import { PlanoGratis } from './cards/plano-gratis/plano-gratis';
import { PlanoPro } from './cards/plano-pro/plano-pro';
import { PlanoPremium } from './cards/plano-premium/plano-premium';

@Component({
  selector: 'app-planos',
  imports: [PlanoGratis, PlanoPro, PlanoPremium],
  templateUrl: './planos.html',
  styleUrl: './planos.scss',
})
export class Planos {}