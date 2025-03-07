import { Component, EventEmitter, Input, Output, SimpleChanges, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  @Input() cadastros: any[] = [];
  @Output() editCadastro = new EventEmitter<number>();
  @Output() deleteCadastro = new EventEmitter<number>();
  

  constructor(private userService: UserService,
      private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
  }

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

  editar(id: number) {
    this.router.navigate(['/user/register', id]);
  }
    
  excluir(id: number) {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (confirmDelete) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.cadastros = this.cadastros.filter((user) => user.id !== id);
        },
        (error) => {
          console.error('Erro ao excluir usuário', error);
        }
      );
    }
  }

  adicionarUsuario() {
    this.router.navigate(['/user/register'], { queryParams: { origem: 'list' } });  }
    
  sair() {
    this.router.navigate(['/login']);
  }
}
