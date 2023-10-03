import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../../services/user.service';
import { Role } from 'src/app/models/role';
import { EmailMatchValidator, PasswordMatchValidator } from 'src/app/models/confirmed.validator';
import { User } from 'src/app/models/user';
import { PermissionsService } from '../../../../../services/permissions.service';
import { Permissions } from 'src/app/models/permissions';
import { Client } from 'src/app/models/client';
import { ApiService } from '../../../../../services/auth/api.service';

@Component({
  selector: 'app-form-modal-user',
  templateUrl: './form-modal-user.component.html',
  styleUrls: ['./form-modal-user.component.scss']
})

export class FormModalUserComponent implements OnInit {

  userForm: FormGroup;
  edit: boolean = false;


  rol: string;
  name: string;

  nameRole: string;

  dataSend: FormData = new FormData();

  @ViewChild('getDNI') inputFileDNI: ElementRef;
  @ViewChild('getFileCamaraComercio') inputFileCamera: ElementRef;
  @ViewChild('getFileRUT') inputFileRUT: ElementRef;

  fileDNI: string;
  fileCamaraComercio: string;
  fileRUT: string;


  selectedFile: any = null;

  userRole: Role[] = [];
  userRoles: Role[] = [];
  listPermissions: Permissions[] = [];


  comercialB: boolean = false;
  listClient: Client[] = [];
  listPS: Permissions[] = [];


  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<FormModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, rol: string },
    private userService: UserService,
    private permissionsService: PermissionsService,
    private apiService : ApiService
  ) {
    this.loadForm();
  }

  async ngOnInit() {
    await this.loadList(this.data.rol);
    
    if (this.data.user !== null) {
      this.userForm.patchValue(this.data.user);
      this.edit = true;
      //Selecciona ROL
      this.rol = this.data.user.roles[0].id;

      //Cargar ROL
      await this.editUserRole(this.data.rol);
      this.name = this.data.user.roles[0].name;
      const listaDeIdsStrings = this.data.user.roles.map(r => r.id);
      this.userForm.get("roles").setValue(listaDeIdsStrings);

      //Cargar Compañia
      this.userForm.get("company").setValue(this.data.user.company.id);

      //Cargar Email
      this.userForm.get("confirm_email").setValue(this.data.user.email);
      this.userForm.get("confirm_password").setValue(this.data.user.password);

      
      //Eliminar campos validados
      this.userForm.get('password').clearValidators();
      this.userForm.get('confirm_password').clearValidators();
      
    } else {
      this.rol = this.userRole.filter(u => u.name === this.nameRole)[0].id;
      this.name = this.userRole.filter(u => u.name === this.nameRole)[0].name;
      this.userForm.get("roles").setValue([this.rol]);     
    }
  }

  loadAdmin(){
    return new Promise((resolve) => {
      this.userService.getAdmin(this.data.user.id).subscribe({
        next: (data: any) => {
          resolve(true);
        },
        error: (err: any) => {
          this.userRole = [];
          resolve(true);
        }
      });
    });
  }

  loadForm() {
    this.userForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      picture: [''],
      companyPosition: [''],
      country: [''],
      city: [''],
      address: [''],
      phone: ['', [Validators.required]],
      roles: [[]],
      permissions: [[]],
      privileges: [[]],
      mainSecondaryUser: [0],
      isCoorporative: [0],
      canBuy: [0],
      dni: [''],
      confirm_email: ['', [Validators.required]],
      company: [ this.apiService.profileUser.company.id ],
      confirm_password: ['', [Validators.required]],
      brands : [[]],
      admin: this._fb.group({
        id: [''],
        adminType: [''],
        adminDesc: ['Descripcion'],
        user: [''],
        clients: [[]]
      }),
    },
      {
        validators: Validators.compose([
          EmailMatchValidator('email', 'confirm_email'), // Validación de email
          PasswordMatchValidator('password', 'confirm_password'), // Validación de contraseña
        ]),
      }
    );
  }

  async loadList(role) {
    await this.loadPermisos();
    switch (role) {
      case 'Administradores':
        this.nameRole = 'Administrador';
        await this.loadRol(this.nameRole, 'Super-Administrador');
        break;
      case 'Comerciales':
        this.nameRole = 'Comercial';
        await this.loadRol(this.nameRole);
        break;
    }
  }

  async editUserRole(role) {
    switch (role) {
      case 'Administradores':
        const data = this.data.user.roles.filter(u => u.name === 'Comercial');
        this.listPS = this.data.user.permissions;
        if (data.length !== 0) {
          this.comercialB = true;
          this.listClient = this.data.user.clients;
        }
        break;
      case 'Comerciales':
        this.listClient = this.data.user.clients;
        break;
      default:
        break;
    }
  }

  loadRol(filter, rol2 = undefined) {
    return new Promise((resolve) => {
      this.userService.getListRol().subscribe({
        next: (data: any) => {
          this.userRoles = data;
          if (rol2) {
            this.userRole = this.userRoles.filter(u => u.name === filter || u.name === rol2);
          } else {
            this.userRole = this.userRoles.filter(u => u.name === filter);
          }
          resolve(true);
        },
        error: (err: any) => {
          this.userRole = [];
          resolve(true);
        }
      });
    });
  }

  loadPermisos() {
    return new Promise((resolve) => {
      this.permissionsService.getList().subscribe({
        next: (data: any) => {
          this.listPermissions = data;
          resolve(true);
        },
        error: (err: any) => {
          this.listPermissions = [];
          resolve(true);
        }
      });
    });
  }

  async saveData() {
    if (this.userForm.valid) {
      if (this.data.user) {        
        this.editAdminDTO();
      } else {
        this.createUserAdminDTO();
      }
    }
  }

  savePermisos(value) {
    const listaDeIdPermissions = value.map(p => p.id);
    this.userForm.get("permissions").setValue(listaDeIdPermissions);
  }

  saveClientes(value) {
    const listaDeIdClients = value.map(p => p.id);
    this.userForm.get("admin.clients").setValue(listaDeIdClients);
  }

  saveRol(value) {
    if (value === 1) {
      const idC = this.userRoles.filter(u => u.name === 'Comercial')[0].id;
      this.userForm.get("roles").setValue([this.rol, idC]);
    } else {
      this.userForm.get("roles").setValue([this.rol]);
    }
    this.userForm.get("isCoorporative").setValue(value);
  }

  //Cambio de ROL

  changeData(e) {
    this.name = this.userRole.filter(u => u.id === e)[0].name;
    this.userForm.get("roles").setValue([e]);
  }

  //Crear usuarios con DTO

  async createUserAdminDTO() {
    if(this.name === 'Super-Administrador'){
      this.userForm.get('dni').setValue(new Date().getTime().toString());
    }
    const id = await this.createUser();
    if (id !== '') {
      this.userForm.get("admin.user").setValue(id);
      this._dialogRef.close(await this.createAdmin());
    }else{
      this._dialogRef.close(true);
    }
  }

  async editAdminDTO() {
    const id = await this.editUser();    
    if (id !== '') {
      this.userForm.get("admin.user").setValue(id);
      this._dialogRef.close(await this.editAdmin());
    }else{
      this._dialogRef.close(true);
    }
  }

  //Crear Usuarios

  createUser() {
    return new Promise<string>((resolve) => {
      this.userService.createUser(this.onSubmit()).subscribe({
        next: (data: any) => {
          resolve(data.newUser.id);
        },
        error: (err: any) => {
          this.userForm.reset();
          resolve('');
        }
      });
    });
  }

  createAdmin() {
    const create = { ...this.userForm.get('admin').value };
    delete create.id;
    return new Promise<boolean>((resolve) => {
      this.userService.createAdmin(create).subscribe({
        next: (data: any) => {
          resolve(true);
        },
        error: (err: any) => {
          this.userForm.reset();
          resolve(true);
        }
      });
    });
  }

  // Editar usuarios

  editUser() {
    return new Promise<string>((resolve) => {
      this.userService.updateCompany(this.onSubmitEdit(), this.data.user.id).subscribe({
        next: (data: any) => {
          resolve(data.user.id);
        },
        error: (err: any) => {
          resolve('');
        }
      });
    });    
  }

  editAdmin() {
    const edit = { ...this.userForm.get('admin').value };
    delete edit.id;
    return new Promise<boolean>((resolve) => {
      this.userService.editAdmin(this.userForm.get('admin.id').value, edit).subscribe({
        next: (data: any) => {
          resolve(true);
        },
        error: (err: any) => {
          resolve(true);
        }
      });
    });
  }

  

  //Data eliminar datos

  onSubmitEdit() {
    const formValue = { ...this.userForm.value };
    delete formValue.confirm_email;
    delete formValue.confirm_password;
    delete formValue.dni;
    delete formValue.password;
    delete formValue.admin;
    return formValue;
  }

  onSubmit() {
    const formValue = { ...this.userForm.value };
    delete formValue.confirm_email;
    delete formValue.confirm_password;
    delete formValue.admin;
    return formValue;
  }
}
