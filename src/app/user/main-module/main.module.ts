import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from '../user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListComponent } from '../user-list/user-list.component';

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    NgIf,
    NgFor,
    CommonModule
  ],
  exports: []
})

export class MainModule { }
