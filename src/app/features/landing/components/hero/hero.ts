import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimarAoEntrar } from '../../../../shared/directives/animar-ao-entrar';

@Component({
  selector: 'app-hero',
  imports: [AnimarAoEntrar, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  scrollPara(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}