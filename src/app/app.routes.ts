import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full' },
  
  {
    path: 'login',
    loadChildren: () => import('../account/login.module').then(m => m.LoginModule), //Lazy load main module
    data: { preload: true }
  },
  {
    path: 'user',
    loadChildren: () => import('./user/main-module/main.module').then(m => m.MainModule), //Lazy load admin module
    data: { preload: true }
  },
  // { 
  //   path: '**', redirectTo:'/login', pathMatch:'full' 
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }