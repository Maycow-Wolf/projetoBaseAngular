import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from '../user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListComponent } from '../user-list/user-list.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { LoginComponent } from '../../login/login.component';
import { AppRoutingModule } from '../../app.routes';

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    UserListComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
    UserComponent,
    UserFormComponent,
    UserListComponent,
    LoginComponent
  ],
  providers: [
    UserService
  ],
})

export class MainModule { }