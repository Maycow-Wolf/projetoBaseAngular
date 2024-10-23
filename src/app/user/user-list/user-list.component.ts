import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  @Input() cadastros: any[] = [];
  @Output() editCadastro = new EventEmitter<number>();

  editar(index: number) {
    this.editCadastro.emit(index);
  }
}
