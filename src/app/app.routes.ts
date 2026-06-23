import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Dashboard } from './features/dashboard/dashboard';
import { Transacoes } from './features/transacoes/transacoes';
import { Login } from './features/auth/login/login';
import { Cadastro } from './features/auth/cadastro/cadastro';
import { authGuard, publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'dashboard',  component: Dashboard,  canActivate: [authGuard] },
  { path: 'transacoes', component: Transacoes, canActivate: [authGuard] },
  { path: 'login',      component: Login,      canActivate: [publicGuard] },
  { path: 'cadastro',   component: Cadastro,   canActivate: [publicGuard] },
  { path: '**', redirectTo: '' }
];