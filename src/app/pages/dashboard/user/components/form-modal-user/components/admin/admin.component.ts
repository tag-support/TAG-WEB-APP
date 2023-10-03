import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs';
import { PermissionsService } from '../../../../../../../services/permissions.service';
import { Permissions } from 'src/app/models/permissions';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Input() userForm: FormGroup;
  @Input() edit: boolean;
  @Input() permissionsSelect: Permissions[] = [];
  @Input() clientSelect: Client[] = [];


  @Output() propagar = new EventEmitter<Permissions[]>();
  @Output() propagarC = new EventEmitter<Client[]>();
  @Output() rolComercial = new EventEmitter<boolean>();



  comercial: number;


  separatorKeysCodes: number[] = [ENTER, COMMA];
  permissionsCtrl = new FormControl('');
  permissionsList: Promise<Permissions[]>;
  selectedPermissions: Permissions[] = [];

  userCtrl = new FormControl('');
  userList: Client[];
  selectedUser: Client[] = [];


  constructor(
    private permissionsService: PermissionsService,
    private userService: UserService
  ) {
    this.permissionsCtrl.valueChanges
      .pipe(map(value => typeof value === 'object' ? '' : ''), startWith(''))
      .subscribe(value => {
        this.permissionsList = permissionsService.getList().toPromise();
      });

    this.userCtrl.valueChanges
      .pipe(map(value => typeof value === 'object' ? '' : ''), startWith(''))
      .subscribe(async value => {
        const data : Client[] = await userService.getListClient().toPromise();
        this.userList = data.filter(u => u.users.length === 0 && u.isActive === true);
      });
  }

  ngOnInit() {
    if (this.clientSelect.length !== 0) {
      this.selectedUser = this.clientSelect;
      this.propagarC.emit(this.selectedUser);
    } 
    if (this.permissionsSelect.length !== 0) {
      this.selectedPermissions = this.permissionsSelect;
      this.propagar.emit(this.selectedPermissions);
    }
  }

  //Permisos
  removeP(permissions: Permissions): void {
    this.selectedPermissions = [...this.selectedPermissions.filter(p => p.id !== permissions.id)];
    this.propagar.emit(this.selectedPermissions);
  }

  selectedP(event: MatAutocompleteSelectedEvent): void {
    const permissions = event.option.value as Permissions
    if (this.selectedPermissions.findIndex(p => p.id === permissions.id) < 0) {
      this.selectedPermissions.push(permissions);
      this.propagar.emit(this.selectedPermissions);
    } else {
      this.removeP(permissions);
    }
  }

  checkSeledPermissions(permissions: Permissions) {
    return this.selectedPermissions.findIndex(p => p.id === permissions.id) > -1;
  }

  //User

  removeU(user: Client): void {
    this.selectedUser = [...this.selectedUser.filter(p => p.id !== user.id)];
    this.propagarC.emit(this.selectedUser);
  }

  selectedU(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value as Client
    if (this.selectedUser.findIndex(p => p.id === user.id) < 0) {
      this.selectedUser.push(user);
      this.propagarC.emit(this.selectedUser);
    } else {
      this.removeU(user);
    }
  }

  checkSeledUser(user: Client) {
    return this.selectedUser.findIndex(p => p.id === user.id) > -1;
  }

  changeRole(id){
    this.rolComercial.emit(id);
    this.comercial = id;
  }
}
