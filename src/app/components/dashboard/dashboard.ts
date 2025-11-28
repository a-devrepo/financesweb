import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  usuario = signal<string>('');

  router = inject(Router);

  ngOnInit(){
    this.atribuirUsuarioAutenticado();
  }

  logout(){

    if(confirm('Deseja realmente sair do sistema?')){

      this.limparSessao();

      this.router.navigate(['autenticar-usuario']);

    }
  }

  private atribuirUsuarioAutenticado(){
    const usuarioAutenticado = this.getUsuarioAutenticado();
    this.usuario.set(usuarioAutenticado?.nome);
  }

  private getUsuarioAutenticado(){
    return JSON.parse(sessionStorage.getItem('usuario') as string) ;
  }

  private limparSessao(){
    sessionStorage.clear();
  }
}
