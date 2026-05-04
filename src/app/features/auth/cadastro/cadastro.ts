import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStats } from '../login/components/login-stats/login-stats';
import { LoginModal } from '../login/components/login-modal/login-modal';
import { CadastroForm } from './components/cadastro-form/cadastro-form';

@Component({
  selector: 'app-cadastro',
  imports: [LoginStats, LoginModal, CadastroForm],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {
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