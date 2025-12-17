import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css',
})
export class CriarUsuario {
  private httpClient = inject(HttpClient);

  mensagemErro = signal<string>('');
  mensagemSucesso = signal<string>('');

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, this.obterRegraDeValidacaoDaSenha(),
    ]),
    senhaConfirmacao: new FormControl('', [Validators.required]),
  });

  private obterRegraDeValidacaoDaSenha(): ValidatorFn {
    return Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#^+=-])[A-Za-z\d@$!%*?&._#^+=-]{8,}$/);
  }

  criarConta() {

    if(this.verificarSenhasDiferentes()){
      this.mensagemErro.set('As senhas não coincidem, por favor verifique.');
      return;
    }

    const novoUsuario = this.formulario.getRawValue();

    this.httpClient
      .post('http://localhost:8082/api/v1/usuarios/criar', novoUsuario)
      .subscribe({
        next: (data:any) => {
          this.mensagemSucesso.set(`${data.nome} cadastrado com sucesso!`);
          this.formulario.reset();
        },
        error: (e) => {
          this.mensagemErro.set(e.error);
        },
      });
  }

  private verificarSenhasDiferentes(){
    return this.formulario.get('senha')?.value !== this.formulario.get('senhaConfirmacao')?.value;
  }
}