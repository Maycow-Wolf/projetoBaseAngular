import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from '../user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListComponent } from '../user-list/user-list.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../user.service';



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
    CommonModule,
    HttpClientModule
  ],
  exports: [
    UserComponent,
    UserFormComponent,
    UserListComponent
  ],
  providers: [
    UserService
  ],
})

export class MainModule { }


/* HttpClientModule foi substituído pela provideHttpClient() função de provedor já existente.
  importar no main.module.ts o providers: [provideHttpClient()]

  importar provideHttpClient() aos provedores no app.config.ts
*/