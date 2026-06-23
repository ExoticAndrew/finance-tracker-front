import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transacao } from '../../../../core/services/transacao';

@Component({
  selector: 'app-ultimas-transacoes',
  imports: [CommonModule],
  templateUrl: './ultimas-transacoes.html',
  styleUrl: './ultimas-transacoes.scss'
})
export class UltimasTransacoes {
  @Input() transacoes: Transacao[] = [];
}