import { Component } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  cadastros: {
    nome?: string,
    idade?: number,
    email?: string,
    cargo?: string }[] = [];

  cadastroEditadoIndex: number | null = null;
  valorInicialForm: any = {};

  editFormEnviado(cadastro: any) {
    if (this.cadastroEditadoIndex !== null) {
      this.cadastros[this.cadastroEditadoIndex] = cadastro;
      this.cadastroEditadoIndex = null;
    } else {
      this.cadastros.push(cadastro);
    }
    this.valorInicialForm = {};
  }

  cadastroEditado(index: number) {
    this.cadastroEditadoIndex = index;
    this.valorInicialForm = { ...this.cadastros[index] };
  }
}
