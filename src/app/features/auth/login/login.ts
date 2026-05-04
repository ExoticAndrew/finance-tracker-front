import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStats } from './components/login-stats/login-stats';
import { LoginForm } from './components/login-form/login-form';
import { LoginModal } from './components/login-modal/login-modal';

@Component({
  selector: 'app-login',
  imports: [LoginStats, LoginForm, LoginModal],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  modalAberto: 'termos' | 'privacidade' | null = null;

  private router = inject(Router);

  abrirTermos() {
    this.modalAberto = 'termos';
    document.body.style.overflow = 'hidden';
  }

  abrirPrivacidade() {
    this.modalAberto = 'privacidade';
    document.body.style.overflow = 'hidden';
  }

  fecharModal() {
    this.modalAberto = null;
    document.body.style.overflow = '';
  }

  irParaLanding() { this.router.navigate(['/']); }
}