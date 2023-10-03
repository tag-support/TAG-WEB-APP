import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { DashboardRoutingModule } from './dashboard/dashboard.routing';
import { authGuardGuard } from '../guard/auth-guard.guard';


const routes: Routes = [
    { 
        path: 'app',
        component: PagesComponent,
        children : [
            { path: 'home', component: HomeComponent, data: { title: 'Inicio' } },            
        ]
    },  
];

@NgModule({
  imports: [ 
    RouterModule.forChild(routes),
    DashboardRoutingModule
 ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}