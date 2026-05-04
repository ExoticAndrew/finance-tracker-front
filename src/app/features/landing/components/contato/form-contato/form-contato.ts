import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-contato',
  imports: [FormsModule],
  templateUrl: './form-contato.html',
  styleUrl: './form-contato.scss',
})
export class FormContato {
  nome = '';
  email = '';
  mensagem = '';

  enviar() {
    console.log({ nome: this.nome, email: this.email, mensagem: this.mensagem });
    alert('Mensagem enviada! Em breve entraremos em contato.');
    this.nome = '';
    this.email = '';
    this.mensagem = '';
  }
}