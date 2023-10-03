import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormModalUserComponent } from './components/form-modal-user/form-modal-user.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phone', 'rol', 'detalles'];

  listUser: User[] = [];

  role: string;
  roleUrl: string;

  cantidad: number = 0;
  pageIndex = 0;
  pageSize = 5;
  insert = true;

  constructor(
    private userService: UserService,
    private _dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.roleUrl = params['role'];
      this.loadRole(this.roleUrl);
    });
  }

  loadRole(role) {
    switch (role) {
      case 'admin':
        this.role = 'Administradores';
        this.loadUser('Administrador', 'Super-Administrador');
        break;
      case 'commercial':
        this.role = 'Comerciales';
        this.loadUser('Comercial');
        break;
      default:
        break;
    }
  }

  loadUser(filter, rol2 = undefined) {
    this.userService.getList().subscribe({
      next: (data) => {
        const dataList: any[] = data;
        if (rol2 !== undefined) {
          this.listUser = dataList.filter(u => u.roles[0].name === filter || u.roles[0].name === rol2);
        } else {
          this.listUser = dataList.filter(u => u.roles[0].name === filter);
        }
      }
    });
  }

  openAddCompany() {
    const dialogRef = this._dialog.open(FormModalUserComponent, {
      data: { user: null, rol :  this.role},
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadRole(this.roleUrl)
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(FormModalUserComponent, {
      data: { user: data, rol :  this.role},
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadRole(this.roleUrl)
        }
      },
    });
  }

  deleteEmployee(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.loadRole(this.roleUrl);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
