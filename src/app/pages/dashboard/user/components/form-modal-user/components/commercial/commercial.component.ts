import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../../../../../services/user.service';
import { map, startWith } from 'rxjs';
import { User } from 'src/app/models/user';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Permissions } from 'src/app/models/permissions';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss']
})
export class CommercialComponent implements OnInit{

  @Input() userForm: FormGroup;
  @Input() edit: boolean;
  @Input() permissions: Permissions[];
  @Input() clientSelect: Client[] = [];
  @Output() propagar = new EventEmitter<Permissions[]>();
  @Output() propagarC = new EventEmitter<Client[]>();


  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  userList: Client[];
  selectedUser: Client[] = [];

  constructor(private userService: UserService) {
    this.userCtrl.valueChanges
      .pipe(map(value => typeof value === 'object' ? '' : ''), startWith(''))
      .subscribe(async value => {
        const data : Client[] = await userService.getListClient().toPromise();
        this.userList = data.filter(u => u.users.length === 0 && u.isActive === true);        
      });
  }

  ngOnInit() {
    this.loadPermisos();

    if (this.clientSelect.length !== 0) {
      this.selectedUser = this.clientSelect;
      this.propagarC.emit(this.selectedUser);
    }
  }

  remove(permissions: Client): void {
    this.selectedUser = [...this.selectedUser.filter(p => p.id !== permissions.id)];
    this.propagarC.emit(this.selectedUser);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const permissions = event.option.value as Client
    if (this.selectedUser.findIndex(p => p.id === permissions.id) < 0) {
      this.selectedUser.push(permissions);
      this.propagarC.emit(this.selectedUser);
    } else {
      this.remove(permissions);
    }
  }

  checkSeledUser(permissions: Client) {
    return this.selectedUser.findIndex(p => p.id === permissions.id) > -1;
  }
  
  loadPermisos(){
    const data = this.permissions.filter(p => 
      p.name === 'Clientes' ||
      p.name === 'Cotizaciones' ||
      p.name === 'Gastos pedidos'
    )
    this.propagar.emit(data);
  }
}
