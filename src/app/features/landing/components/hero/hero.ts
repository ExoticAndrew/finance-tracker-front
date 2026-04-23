import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  scrollPara(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}