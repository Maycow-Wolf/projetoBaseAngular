import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user/user-form/user-form.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [{ 
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: UserFormComponent },
      { path: '**', redirectTo:'/login', pathMatch:'full' },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }