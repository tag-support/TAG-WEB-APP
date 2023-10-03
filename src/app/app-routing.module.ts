import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: 'login', component: AuthComponent , data: { title: 'Iniciar Sesión' }},
  { path: '', redirectTo: '/app/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
