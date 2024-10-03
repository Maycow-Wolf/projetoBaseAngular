import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MainModule } from './main-module/main.module';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MainModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  cadastros: {
    nome?: string,
    idade?: number,
    email?: string,
    cargo?: string }[] = [];
  
  meuFormulario = new FormGroup({

    nome: new FormControl("",[Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    idade: new FormControl(0,[Validators.min(18), Validators.max(80), Validators.required]),
    email: new FormControl("",[Validators.email, Validators.required]),
    cargo: new FormControl("",[Validators.required]),
  });

  cadastroEditadoIndex: number | null = null;

  enviarFormulario() {
    if(this.meuFormulario.valid) {
      if(this.cadastroEditadoIndex !== null) {
        this.cadastros[this.cadastroEditadoIndex] = {
          nome: this.meuFormulario.controls.nome.value!,
          idade: this.meuFormulario.controls.idade.value!,
          email: this.meuFormulario.controls.email.value!,
          cargo: this.meuFormulario.controls.cargo.value!
        };

        this.cadastroEditadoIndex = null;

      } else {
        this.cadastros.push({ 
          nome: this.meuFormulario.controls.nome.value!,
          idade: this.meuFormulario.controls.idade.value!,
          email: this.meuFormulario.controls.email.value!,
          cargo: this.meuFormulario.controls.cargo.value!
        });
      }

      this.meuFormulario.reset();
      this.meuFormulario.controls.cargo.setValue('');
    }
  }

  editarCadastro(index: number) {
    const cadastro = this.cadastros[index];
    this.meuFormulario.setValue({
      nome: cadastro.nome || '',
      idade: cadastro.idade || null,
      email: cadastro.email || '',
      cargo: cadastro.cargo || ''
    });

    this.cadastroEditadoIndex = index;
  }
}
