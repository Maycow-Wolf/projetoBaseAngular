import { Component, EventEmitter, Input, Output, SimpleChanges, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";

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
      private router: Router,
      private datePipe: DatePipe) {}

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

  formatarData(data: string): string {
    return this.datePipe.transform(data, 'dd/MM/yyyy') || ''; //dataPipe formatar datas
  }

  calcularIdade(dataNascimento: string): number {
    if (!dataNascimento) return 0;

    const nascimento = new Date(dataNascimento); // converte a string dataNascimento para formato data
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
      idade--;
    }
    
    return idade;

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
