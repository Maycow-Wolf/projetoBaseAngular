import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { error } from 'node:console';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit {
  cadastros: any[] = [];
  cadastroEditadoId: number | null = null;
  valorInicialForm: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.cadastros = users;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  buscarUsuarioId(id: number) {
    this.userService.getUserById(id).subscribe(
      (user) => {
        this.valorInicialForm = user;
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
          this.cadastros = this.cadastros.map((user) =>
            user.id === usuarioAtualizado.id ? usuarioAtualizado : user
        );
        this.resetarFormulario();
        },
        (error) => {
          console.error('Erro ao atualizar usuário', error);
        }
      );
    } else {
      this.userService.createUser(cadastro).subscribe(
        (novoUsuario) => {
          this.cadastros.push(novoUsuario);
          this.resetarFormulario();
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
        this.cadastros = this.cadastros.filter((user) => user.id !== id);
      },
      (error) => {
        console.error('Erro ao excluir usuário', error);
      }
    );
  }

  resetarFormulario(){
      this.valorInicialForm = {};
      this.cadastroEditadoId = null;
  }
}


