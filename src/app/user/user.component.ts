import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit {
  usuarios: any[] = [];
  cadastroEditadoId: number | null = null;
  form: any = {};
  exibirFormulario: boolean = false;

  constructor(private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.carregarUsuarios();
    
  }

  carregarUsuarios() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.usuarios = users;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  buscarUsuarioId(id: number) {
    this.userService.getUserById(id).subscribe(
      (user) => {
        this.exibirFormulario = true;
        this.form = {...user};
        this.cadastroEditadoId = user.id;
      },
      (error) => {
        console.error('Erro ao carregar usuários pelo id:', error);
      }
    );
  }

  excluirUsuario(id: number){
    this.userService.deleteUser(id).subscribe(
      () => {
        this.usuarios = this.usuarios.filter((user) => user.id !== id);
      },
      (error) => {
        console.error('Erro ao excluir usuário', error);
      }
    );
  }

  // resetarFormulario(){
  //   this.form = {};
  //   this.cadastroEditadoId = null;
  // }

  // voltarListagem() {
  //   this.exibirFormulario = false;
  // }
}
