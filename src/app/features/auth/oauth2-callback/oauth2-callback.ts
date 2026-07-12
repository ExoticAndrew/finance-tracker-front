import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-oauth2-callback',
  imports: [],
  templateUrl: './oauth2-callback.html',
  styleUrl: './oauth2-callback.scss'
})
export class Oauth2Callback implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const nome = this.route.snapshot.queryParamMap.get('nome');

    if (token && nome) {
      this.authService.salvarSessao(token, nome);
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}