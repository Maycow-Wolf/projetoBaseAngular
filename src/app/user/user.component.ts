import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BlockList } from 'node:net';

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

  constructor(private userService: UserService) {
  }

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
        this.form = user;
        this.cadastroEditadoId = id;
      },
      (error) => {
        console.error('Erro ao carregar usuários pelo id:', error);
      }
    );
  }

  salvarUsuario(cadastro: any) {
    if (this.cadastroEditadoId !== null){
      this.userService.updateUser(this.cadastroEditadoId, cadastro).subscribe(
        (usuarioAtualizado) => {
          this.usuarios = this.usuarios.map((user) =>
            user.id === usuarioAtualizado.id ? usuarioAtualizado : user
        );
        this.voltarListagem();
        },
        (error) => {
          console.error('Erro ao atualizar usuário', error);
        }
      );
    } else {
      this.userService.createUser(cadastro).subscribe(
        (novoUsuario) => {
          this.usuarios.push(novoUsuario);
          this.voltarListagem();
        },
        (error) => {
          console.error('Erro ao criar usuário', error);
        }
      );
    }
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

  resetarFormulario(){
    this.form = {};
    this.cadastroEditadoId = null;
    this.voltarListagem();
  }

  voltarListagem() {
    this.exibirFormulario = false;
    this.carregarUsuarios();
  }
}
