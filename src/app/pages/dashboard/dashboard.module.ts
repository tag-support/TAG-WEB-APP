import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutUserComponent } from './layout/layout-user.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { FormModalCompanyComponent } from './company/components/form-modal-company/form-modal-company.component';
import { UserComponent } from './user/user.component';
import { FormModalUserComponent } from './user/components/form-modal-user/form-modal-user.component';
import { SuperAdminComponent } from './user/components/form-modal-user/components/super-admin/super-admin.component';
import { AdminComponent } from './user/components/form-modal-user/components/admin/admin.component';
import { CommercialComponent } from './user/components/form-modal-user/components/commercial/commercial.component';
import { ClientComponent } from './client/client.component';
import { SupplierComponent } from './supplier/supplier.component';
import { FormModalSupplierComponent } from './supplier/components/form-modal-supplier/form-modal-supplier.component';
import { FormModalClientComponent } from './client/components/form-modal-client/form-modal-client.component';
import { ClientNaturalPersonComponent } from './client/components/form-modal-client/components/client-natural-person/client-natural-person.component';
import { ClientLegalEntityComponent } from './client/components/form-modal-client/components/client-legal-entity/client-legal-entity.component';
import { SupplierNaturalPersonComponent } from './supplier/components/form-modal-supplier/components/supplier-natural-person/supplier-natural-person.component';
import { SupplierLegalEntityComponent } from './supplier/components/form-modal-supplier/components/supplier-legal-entity/supplier-legal-entity.component';
import { ListClientComponent } from './client/components/list-client/list-client.component';
import { PrimaryCorporateClientComponent } from './client/components/form-modal-client/components/primary-corporate-client/primary-corporate-client.component';
import { SecondaryCorporateClientComponent } from './client/components/form-modal-client/components/secondary-corporate-client/secondary-corporate-client.component';
import { ListSupplierComponent } from './supplier/components/list-supplier/list-supplier.component';



@NgModule({
  declarations: [
    LayoutUserComponent,
    DashboardComponent,
    CompanyComponent,
    FormModalCompanyComponent,
    FormModalUserComponent,
    UserComponent,
    SuperAdminComponent,
    SupplierLegalEntityComponent,
    AdminComponent,
    CommercialComponent,

    //Cliente
    ClientComponent,
    FormModalClientComponent,
    ClientNaturalPersonComponent,
    ClientLegalEntityComponent,

    //Proveedor
    SupplierComponent,
    FormModalSupplierComponent,
    SupplierNaturalPersonComponent,
    SupplierLegalEntityComponent,
    ListClientComponent,
    PrimaryCorporateClientComponent,
    SecondaryCorporateClientComponent,
    ListSupplierComponent
  ],
  exports: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class DashboardModule { }
