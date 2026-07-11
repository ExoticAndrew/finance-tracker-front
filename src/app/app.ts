import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(12px)' }),
        animate('280ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class App {
  protected readonly title = signal('finance-tracker-front');

  private router = inject(Router);
  currentUrl = signal('');

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => this.currentUrl.set((e as NavigationEnd).urlAfterRedirects));
  }
}