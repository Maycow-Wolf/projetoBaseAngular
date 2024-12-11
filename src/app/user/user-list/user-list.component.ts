import { Component, EventEmitter, Input, output, Output } from "@angular/core";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  @Input() cadastros: any[] = [];
  @Output() editCadastro = new EventEmitter<number>();
  @Output() deleteCadastro = new EventEmitter<number>();

  editar(id: number) {
    this.editCadastro.emit(id);
  }

  excluir(id: number) {
    this.deleteCadastro.emit(id);
  }

}
