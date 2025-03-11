import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {  
  email: string = '';
  senha: string = '';
  usuarios: any[] = [];
  mensagem: string = '';
  mostrarSenha: boolean = false;

  meuLogin = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    senha: new FormControl("", [Validators.minLength(6), Validators.maxLength(12), Validators.required]),
  });

  constructor(private router: Router,
    private loginService: LoginService)
  { }
  
  ngOnInit(): void {
    this.carregarUsuarios();
  }

  acessarCadastro() {
    this.router.navigate(['/user/register'], { queryParams: { origem: 'login' } });  }

  carregarUsuarios() {
    this.loginService.getUsers().subscribe(
      (users) => {
        this.usuarios = users;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  acessarUsuarios() {
    const { email, senha } = this.meuLogin.value;
    const usuarioEncontrado = this.usuarios.find(
      (user) => user.email === email && user.senha === senha
    );
    if (usuarioEncontrado) {
      this.router.navigate(['/user/list']);
    } else {
      this.mensagem = 'E-mail ou senha inválidos!';
    }
  }

  limparMensagem () {
    this.mensagem = '';
  }

  alternarVisibilidadeSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
