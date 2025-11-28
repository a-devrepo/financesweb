import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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

  formulario = new FormGroup(
    {
      email: new FormControl('',Validators.required),
      senha: new FormControl('',Validators.required),
    }
  )

  autenticar(){
    const usuario = this.formulario.getRawValue();
    console.log(usuario);
  }
}
