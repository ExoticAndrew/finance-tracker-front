import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth';

@Component({
  selector: 'app-cadastro-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro-form.html',
  styleUrl: './cadastro-form.scss',
})
export class CadastroForm {
  @Output() abrirTermos = new EventEmitter<void>();
  @Output() abrirPrivacidade = new EventEmitter<void>();

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  mostrarSenha = false;
  mostrarConfirmarSenha = false;
  carregando = signal(false);
  erroSenha = false;
  erro = signal('');

  private router = inject(Router);
  private authService = inject(AuthService);

  async cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      this.erro.set('Preencha todos os campos.');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.erroSenha = true;
      this.erro.set('As senhas não coincidem.');
      return;
    }

    if (this.senha.length < 8) {
      this.erro.set('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    this.erroSenha = false;
    this.erro.set('');
    this.carregando.set(true);

    const sucesso = await this.authService.cadastrar(this.nome, this.email, this.senha);

    this.carregando.set(false);

    if (sucesso) {
      this.router.navigate(['/dashboard']);
    } else {
      this.erro.set('Não foi possível criar a conta. Tente novamente.');
    }
  }

  irParaLogin() { this.router.navigate(['/login']); }
}