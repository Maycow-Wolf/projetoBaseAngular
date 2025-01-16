import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    usuarios: any[] = [];

    meuLogin = new FormGroup({
        email: new FormControl("", [Validators.email, Validators.required]),
        senha: new FormControl("", [Validators.minLength(6), Validators.maxLength(10), Validators.required]),
    });

    constructor(private router: Router)
        // private userService: UserService)
    { }
    
    ngOnInit(): void {
        //this.carregarUsuarios();
    }

    acessarCadastro() {
        this.router.navigate(['/registro']);
    }

    loginCadastro() {
        alert('loginCadastro')
    }

    /*carregarUsuarios() {
        this.userService.getUsers().subscribe(
          (users) => {
            this.usuarios = users;
          },
          (error) => {
            console.error('Erro ao carregar usuários:', error);
          }
        );
      }*/
}
