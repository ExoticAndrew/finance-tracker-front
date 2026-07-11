import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements AfterViewInit, OnDestroy {
  @Input() nomeUsuario = 'Usuário';
  @Output() logoutEvent = new EventEmitter<void>();

  @ViewChildren('navItem') navItems!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('indicator') indicator!: ElementRef<HTMLElement>;

  private router = inject(Router);
  private sub!: Subscription;

  ngAfterViewInit(): void {
    this.moverIndicador();

    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.moverIndicador());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private moverIndicador(): void {
    requestAnimationFrame(() => {
      const ativo = this.navItems?.find(item =>
        item.nativeElement.classList.contains('active')
      );
      if (ativo && this.indicator) {
        const top = ativo.nativeElement.offsetTop;
        const height = ativo.nativeElement.offsetHeight;
        this.indicator.nativeElement.style.transform = `translateY(${top}px)`;
        this.indicator.nativeElement.style.height = `${height}px`;
        this.indicator.nativeElement.style.opacity = '1';
      }
    });
  }
}