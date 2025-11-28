import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css',
})
export class AutenticarUsuario {

  private httpClient = inject(HttpClient)
  private router = inject(Router);

  mensagemErro = signal<string>('');

  formulario = new FormGroup(
    {
      email: new FormControl('',Validators.required),
      senha: new FormControl('',Validators.required),
    }
  )

  autenticar(){

    const usuario = this.formulario.getRawValue();

    this.httpClient.post('http://localhost:8082/api/v1/usuarios/autenticar', usuario)
    .subscribe(
      {
        next: (data) => {
          const response = data;
          this.router.navigate(['dashboard']);

        },
        error:(e) => {
          this.mensagemErro.set(e.error);
        }
      }
    )
  }
}
