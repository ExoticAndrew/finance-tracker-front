import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumo-cards',
  imports: [CommonModule],
  templateUrl: './resumo-cards.html',
  styleUrl: './resumo-cards.scss'
})
export class ResumoCards {
  @Input() saldo = 0;
  @Input() totalReceitas = 0;
  @Input() totalDespesas = 0;
}