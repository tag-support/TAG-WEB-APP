import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';
import { RouterModule } from '@angular/router';

//Material
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ItemProductComponent } from './home/components/item-product/item-product.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    LayoutComponent,
    ItemProductComponent
  ],
  exports: [
    PagesComponent,
    MaterialModule
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    DashboardModule,
    MaterialModule
  ]
})
export class PagesModule { }
