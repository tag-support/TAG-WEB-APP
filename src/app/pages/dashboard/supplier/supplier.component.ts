import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { FormModalSupplierComponent } from './components/form-modal-supplier/form-modal-supplier.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent {

  displayedColumns: string[] = ['name', 'email', 'phone', 'rol', 'detalles'];

  listSolicitudes: Client[] = [];
  listActuales: Client[] = [];

  role: string;
  roleUrl: string;

  cantidad: number = 0;
  pageIndex = 0;
  pageSize = 5;
  insert = true;

  constructor(
    private clientService: ClientService,
    private _dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadClient();
  }

  loadClient(){
    this.clientService.getList().subscribe({
      next : (data) => {
        this.listSolicitudes = data.filter(c => c.isActive === false);
        this.listActuales = data.filter(c => c.isActive === true);
      }
    });
  }

  openAddCompany() {
    const dialogRef = this._dialog.open(FormModalSupplierComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadClient();
        }
      },
    });
  }  

  deleteClient(id) {
    this.clientService.deleteClient(id).subscribe({
      next: (res) => {
        this.loadClient();
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }

}
