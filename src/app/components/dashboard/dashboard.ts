import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';

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
    this.getNomeUsuario();
  }

  logout(){

    if(confirm('Deseja realmente sair do sistema?')){

      this.limparSessao();

      this.router.navigate(['autenticar-usuario']);

    }
  }

  private getNomeUsuario(){
    const usuarioAutenticado = this.getUsuarioAutenticado();
    this.usuario.set(usuarioAutenticado?.nome);
  }

  private getUsuarioAutenticado(){
    const auth = sessionStorage.getItem('usuario')?.toString();
    const bytes = CryptoJS.AES.decrypt(auth as string, 'auth');
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }

  private limparSessao(){
    sessionStorage.clear();
  }
}
