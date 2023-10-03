import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from '../../../services/company.service';
import { Company } from 'src/app/models/company';
import { MatDialog } from '@angular/material/dialog';
import { FormModalCompanyComponent } from './components/form-modal-company/form-modal-company.component';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent  implements OnInit{

  displayedColumns: string[] = ['#','name', 'tipoId','nit', 'billingEmail','tipo','detalles'];

  listCompany : Company[] = [];  

  cantidad: number = 0;
  pageIndex = 0;
  pageSize = 5;
  insert = true;

  constructor(
    private companyService : CompanyService,
    private _dialog: MatDialog,
  ){}

  ngOnInit(){
    this.loadCompany();
  }

  loadCompany(){
    this.companyService.getList().subscribe({
      next : (data) => {
        this.listCompany = data;
      }
    });
  }

  openAddCompany() {
    const dialogRef = this._dialog.open(FormModalCompanyComponent, {
      data: { company: undefined, view : undefined},
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadCompany();
        }
      },
    });
  }

  openEditForm(data: any, view = false) {
    const dialogRef = this._dialog.open(FormModalCompanyComponent, {
      data: { company: data, view : view},
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadCompany();
        }
      },
    });
  }

  changeIsActive(id: number) {
    this.companyService.changeData(id).subscribe({
      error: (err) =>{
        this.loadCompany();
      }
    });
  }

  deleteEmployee(id: number) {
    this.companyService.deleteCompany(id).subscribe({
      next: (res) => {
        this.loadCompany();
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }
}
