import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { CompanyComponent } from "./company/company.component";
import { UserComponent } from "./user/user.component";
import { authGuardGuard } from "src/app/guard/auth-guard.guard";
import { SupplierComponent } from "./supplier/supplier.component";
import { ClientComponent } from "./client/client.component";



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuardGuard],
    children: [
      { path: 'supplier', component: SupplierComponent, data: { title: 'Proveedores' } },
      { path: 'client', component: ClientComponent, data: { title: 'Clientes' } },
      { path: 'users/:role', component: UserComponent, data: { title: 'Usuarios' } },
      { path: 'companies', component: CompanyComponent, data: { title: 'Empresas' } },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }