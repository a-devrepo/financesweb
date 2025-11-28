import { Routes } from '@angular/router';
import { AutenticarUsuario } from './components/autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './components/criar-usuario/criar-usuario';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  {path: 'autenticar-usuario', component: AutenticarUsuario},
  {path: 'criar-usuario', component: CriarUsuario},
  {path: 'dashboard', component: Dashboard},
  {path: '', redirectTo:'autenticar-usuario',pathMatch: 'full'}
];
