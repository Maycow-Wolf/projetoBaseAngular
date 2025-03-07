import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login.routes';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HttpClientModule
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    LoginService
  ],
})
export class LoginModule { }
