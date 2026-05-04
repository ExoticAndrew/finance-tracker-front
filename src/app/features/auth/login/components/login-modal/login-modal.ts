import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  imports: [CommonModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.scss',
})
export class LoginModal {
  @Input() tipo: 'termos' | 'privacidade' | null = null;
  @Output() fechar = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEsc() { this.fechar.emit(); }

  get titulo(): string {
    return this.tipo === 'termos' ? 'Termos de Uso' : 'Política de Privacidade';
  }
}