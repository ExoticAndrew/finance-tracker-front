import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-transacoes',
  imports: [CommonModule],
  templateUrl: './card-transacoes.html',
  styleUrl: './card-transacoes.scss',
})
export class CardTransacoes {
  transacoes = [
    { descricao: 'Mercado', categoria: 'Alimentação', valor: 'R$ 150,00', emoji: '🥑', cor: '#3db87a' },
    { descricao: 'Salário', categoria: 'Receita', valor: 'R$ 3.500,00', emoji: '💰', cor: '#3db87a' },
    { descricao: 'Netflix', categoria: 'Entretenimento', valor: 'R$ 45,00', emoji: '🎬', cor: '#5e9cf5' },
    { descricao: 'Uber', categoria: 'Transporte', valor: 'R$ 23,00', emoji: '🚗', cor: '#f5a623' },
    { descricao: 'Freelance', categoria: 'Receita', valor: 'R$ 800,00', emoji: '💻', cor: '#3db87a' },
    { descricao: 'Academia', categoria: 'Saúde', valor: 'R$ 99,00', emoji: '💪', cor: '#f5a623' },
    { descricao: 'Restaurante', categoria: 'Alimentação', valor: 'R$ 87,00', emoji: '🍽️', cor: '#5e9cf5' },
    { descricao: 'Spotify', categoria: 'Assinatura', valor: 'R$ 19,90', emoji: '🎵', cor: '#a78bfa' },
    { descricao: 'Seguro', categoria: 'Seguro', valor: 'R$ 73,00', emoji: '☂️', cor: '#a78bfa' },
    { descricao: 'Café', categoria: 'Alimentação', valor: 'R$ 12,00', emoji: '☕', cor: '#f5a623' },
  ];
}