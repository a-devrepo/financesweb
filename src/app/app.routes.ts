import { Routes } from '@angular/router';
import { AutenticarUsuario } from './components/autenticar-usuario/autenticar-usuario';
import { CriarUsuario } from './components/criar-usuario/criar-usuario';

export const routes: Routes = [
  {path: 'autenticar-usuario', component: AutenticarUsuario},
  {path: 'criar-usuario', component: CriarUsuario},
  {path: '', redirectTo:'autenticar-usuario',pathMatch: 'full'}
];
