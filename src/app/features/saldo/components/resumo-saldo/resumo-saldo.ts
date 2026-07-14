import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumoSaldoInfo } from '../../saldo';

@Component({
  selector: 'app-resumo-saldo',
  imports: [CommonModule],
  templateUrl: './resumo-saldo.html',
  styleUrl: './resumo-saldo.scss'
})
export class ResumoSaldo {
  @Input() resumo: ResumoSaldoInfo | null = null;
}