import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListComponent } from '../user-list/user-list.component';
import { LoginComponent } from '../../../account/login/login.component';

const routes: Routes = [{
  path: '',
  children: [
      { path: 'register', component: UserFormComponent },
      { path: 'list', component: UserListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register/:id', component: UserFormComponent },
      { path: '**', redirectTo: '/login', pathMatch: 'full' },
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutes { }
