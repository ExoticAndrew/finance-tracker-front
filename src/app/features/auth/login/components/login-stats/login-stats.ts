import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-login-stats',
  imports: [CommonModule],
  templateUrl: './login-stats.html',
  styleUrl: './login-stats.scss',
})
export class LoginStats implements OnInit, OnDestroy {

  usuariosAtivos = 0;
  avaliacao = 0;
  economia = 0;

  private subs: Subscription[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.animarInicial(2000, 300, 1800, (v) => {
      this.usuariosAtivos = Math.round(v);
      this.cdr.detectChanges();
    });

    this.animarInicial(4.9, 500, 2000, (v) => {
      this.avaliacao = parseFloat(v.toFixed(1));
      this.cdr.detectChanges();
    });

    this.animarInicial(400, 700, 1600, (v) => {
      this.economia = Math.round(v);
      this.cdr.detectChanges();
    });

    this.subs.push(
      timer(2500).subscribe(() => {
        this.subs.push(
          interval(3000).subscribe(() => {
            this.usuariosAtivos += Math.floor(Math.random() * 3) + 1;
            this.cdr.detectChanges();
          })
        );
      }),

      timer(3000).subscribe(() => {
        this.subs.push(
          interval(5000).subscribe(() => {
            const variacao = (Math.random() * 0.2) - 0.1;
            const novo = parseFloat((this.avaliacao + variacao).toFixed(1));
            this.avaliacao = Math.min(5.0, Math.max(4.8, novo));
            this.cdr.detectChanges();
          })
        );
      }),

      timer(3500).subscribe(() => {
        this.subs.push(
          interval(4000).subscribe(() => {
            const variacao = Math.floor(Math.random() * 10) - 4;
            const novo = this.economia + variacao;
            this.economia = Math.min(420, Math.max(380, novo));
            this.cdr.detectChanges();
          })
        );
      })
    );
  }

  private animarInicial(
    fim: number,
    delay: number,
    duracao: number,
    callback: (v: number) => void
  ) {
    this.subs.push(
      timer(delay).subscribe(() => {
        const passos = 60;
        const intervaloMs = duracao / passos;
        let passo = 0;
        let sub: Subscription;

        sub = interval(intervaloMs).subscribe(() => {
          passo++;
          const progresso = 1 - Math.pow(1 - passo / passos, 3);
          callback(fim * progresso);

          if (passo >= passos) {
            callback(fim);
            sub.unsubscribe();
          }
        });

        this.subs.push(sub);
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}