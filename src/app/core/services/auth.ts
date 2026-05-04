import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'fintrack_token';

  constructor(private router: Router) {}

  login(email: string, senha: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tokenFake = 'token_simulado_123';
        localStorage.setItem(this.TOKEN_KEY, tokenFake);
        resolve(true);
      }, 2000);
    });
  }

  cadastrar(nome: string, email: string, senha: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tokenFake = 'token_simulado_123';
        localStorage.setItem(this.TOKEN_KEY, tokenFake);
        resolve(true);
      }, 2000);
    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/']);
  }

  estaLogado(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}