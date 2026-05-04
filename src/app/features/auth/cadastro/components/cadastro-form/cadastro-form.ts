import { Component, Output, EventEmitter, inject } from '@angular/core';
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
  carregando = false;
  erroSenha = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  async cadastrar() {
    if (this.senha !== this.confirmarSenha) {
      this.erroSenha = true;
      return;
    }
    this.erroSenha = false;
    this.carregando = true;
    const sucesso = await this.authService.cadastrar(this.nome, this.email, this.senha);
    this.carregando = false;
    if (sucesso) this.router.navigate(['/dashboard']);
  }

  irParaLogin() { this.router.navigate(['/login']); }
}