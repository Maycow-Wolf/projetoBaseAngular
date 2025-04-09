import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from '../user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListComponent } from '../user-list/user-list.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { AppRoutingModule } from '../../app.routes';
import { MainRoutes } from './main.routes';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

defineLocale('pt-br', ptBrLocale);

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
    HttpClientModule,
    AppRoutingModule,
    MainRoutes,
    BsDatepickerModule
  ],
  exports: [
    UserComponent,
    UserFormComponent,
    UserListComponent
  ],
  providers: [
    UserService,
    DatePipe
  ],
})

export class MainModule { 
  constructor(private bsLocaleService: BsLocaleService){
    this.bsLocaleService.use('pt-br')
  }
}