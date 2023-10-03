import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';
import { User } from 'src/app/models/user';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import { FormModalClientComponent } from './components/form-modal-client/form-modal-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'rol', 'detalles'];

  listSolicitudes: User[] = [];
  listActuales: User[] = [];

  role: string;
  roleUrl: string;

  cantidad: number = 0;
  pageIndex = 0;
  pageSize = 5;
  insert = true;

  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private _dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadClient();
  }

  loadClient(){
    this.userService.getList().subscribe({
      next : (data) => {
        this.listActuales = data.filter(c => c.roles[0].name === 'Cliente' && c.isActive === true);
      }
    });
  }

  openAddCompany() {
    const dialogRef = this._dialog.open(FormModalClientComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadClient();
        }
      },
    });
  }

  deleteClient(id) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.loadClient();
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }
}
