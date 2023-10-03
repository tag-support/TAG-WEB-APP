import { Component, Input, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormModalUserComponent } from '../../../user/components/form-modal-user/form-modal-user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { EmailMatchValidator, PasswordMatchValidator } from 'src/app/models/confirmed.validator';
import { ClientService } from '../../../../../services/client.service';
import { UserService } from 'src/app/services/user.service';
import { BrandService } from 'src/app/services/brand.service';
import { CompanyService } from 'src/app/services/company.service';
import { ApiService } from '../../../../../services/auth/api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-form-modal-client',
  templateUrl: './form-modal-client.component.html',
  styleUrls: ['./form-modal-client.component.scss']
})
export class FormModalClientComponent implements OnInit {

  userForm: FormGroup;
  formValue: any;
  edit: boolean = false;

  listClientsSelect = [
    {
      name: 'Cliente corporativo principal',
      value: 'CCP'
    },
    {
      name: 'Cliente corporativo secundario',
      value: 'CCS'
    },
    {
      name: 'Cliente no corporativo persona natural',
      value: 'CNCPN'
    },
    {
      name: 'Cliente no corporativo persona juridica',
      value: 'CNOPJ'
    },
  ];

  name: string;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<FormModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private clientService: ClientService,
    private brandService: BrandService,
    private userService: UserService,
    private companyService: CompanyService,
    private apiService: ApiService
  ) {
    this.loadForm();
  }

  ngOnInit() {
    if (this.data !== null) {
      this.loadDataEdit();
      this.userForm.patchValue(this.data);
      this.edit = true;
    }
  }

  loadForm() {
    this.userForm = this._fb.group({
      email: ['sergio@gmail.com', [Validators.required, Validators.email]],
      password: ['1234567', [Validators.required]],
      name: ['Sercgio c', [Validators.required]],
      picture: [''],
      companyPosition: ['Dev'],
      country: [''],
      city: [''],
      address: [''],
      phone: ['123141', [Validators.required]],
      roles: [[]],
      permissions: [[]],
      privileges: [[]],
      mainSecondaryUser: [0],
      isCoorporative: [0],
      canBuy: [0],
      dni: ['124123123'],
      confirm_email: ['sergio@gmail.com', [Validators.required]],
      company: [''],
      confirm_password: ['1234567', [Validators.required]],
      client: this._fb.group({
        employeesNumber: [0],
        billingEmail: [''],
        deliveryAddress: [''],
        margin: [10],
        paymentTerms: [0],
        annualSalesGoal: [0],
        annualMonthlyGoals: [0],
        manageBrands: [0],
        user: [''],
        addresses: [[]],
        brands: [[]]
      }),
      brands: this._fb.array([
        this.initAddress(),
      ])
    },
      {
        validators: Validators.compose([
          EmailMatchValidator('email', 'confirm_email'), // Validación de email
          PasswordMatchValidator('password', 'confirm_password'), // Validación de contraseña
        ]),
      }
    ); 
    this.laodRole();
  }

  initAddress() {
    return this._fb.group({
      id: [''],
      name: [''],
      fee: ['']
    });
  }

  laodRole() {
    this.userService.getListRol().subscribe({
      next: (data) => {
        const role = data.filter(r => r.name === 'Cliente')[0].id;
        this.userForm.get("roles").setValue([role]);
      }
    })
  }

  async saveData() {
    if (this.userForm.valid) {
      if (this.data) {
        this.editUser();
      } else {
        console.log(this.userForm.value);
        //this.selectRoleSave(this.name);
      }
    }
  }

  editUser() {
    this.clientService.updateClient(this.userForm.value, this.data.id).subscribe({
      next: (data: any) => {
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }


  async selectRoleSave(role) {
    this.formValue = { ...this.userForm.value };
    switch (role) {
      case "CCP":
        this.userForm.get("isCoorporative").setValue(1);
        this.userForm.get("client.manageBrands").setValue(1);
        this.userForm.get("client.brands").setValue(await this.createBrands());
        break;
      case "CCS":
        this.userForm.get("isCoorporative").setValue(1);
        this.userForm.get("mainSecondaryUser").setValue(1);
        this.userForm.get("client.manageBrands").setValue(1);
        this.userForm.get("client.brands").setValue(await this.createBrands());

        this.userForm.get("company").setValue(this.apiService.profileUser.company.id);
        this.userForm.get("client.billingEmail").setValue(this.apiService.profileUser.company.billingEmail);
        break;
      case "CNCPN":
        this.userForm.get('dni').setValue(new Date().getTime().toString());
        this.userForm.get("client.brands").setValue([]);
        this.userForm.get("client.manageBrands").setValue(0);
        break;
      case "CNOPJ":
        this.userForm.get('dni').setValue(new Date().getTime().toString());
        this.userForm.get("client.brands").setValue([]);
        this.userForm.get("client.manageBrands").setValue(0);
        break;
      default:
        break;
    }
    this.createUserClientDTO();
  }

  async loadDataEdit() {
    const listBrands = this.data.client.brands.map(p => p.id);
    this.userForm.get("confirm_email").setValue(this.data.email);
    this.userForm.get("brands").setValue(this.data.client.brands);
    this.userForm.get("client.brands").setValue(listBrands);

    if (this.data.isCoorporative === 1 && this.data.mainSecondaryUser === 0) {
      this.name = "CCP";
    } else if (this.data.mainSecondaryUser === 1) {
      this.name = "CCS";
    } else if (this.data.company.legalCapacity === "Natural" && this.data.isCoorporative === 0) {
      this.name = "CNCPN"
    } else if (this.data.company.legalCapacity === "Juridica" && this.data.isCoorporative === 0) {
      this.name = "CNOPJ";
    }
    console.log(this.name);    
  }


  async createUserClientDTO() {
    const id = await this.createUser();
    if (id !== '') {
      this.userForm.get("client.user").setValue(id);
      this._dialogRef.close(await this.createClient());
    } else {
      this._dialogRef.close(true);
    }
  }

  createUser() {
    return new Promise<string>((resolve) => {
      this.userService.createUser(this.onSubmit()).subscribe({
        next: (data: any) => {
          resolve(data.newUser.id);
        },
        error: (err: any) => {
          this.userForm.reset();
          this._dialogRef.close(true);
          resolve('');
        }
      });
    });
  }

  createClient() {
    return new Promise<boolean>((resolve) => {
      this.clientService.createClient(this.userForm.get('client').value).subscribe({
        next: (data: any) => {
          resolve(true);
        },
        error: (err: any) => {
          this.userForm.reset();
          this._dialogRef.close(true);
          resolve(true);
        }
      });
    });
  }

  createBrands() {
    const data = { ...this.userForm.value };
    delete data.client.brands.id;
    return new Promise<any[]>((resolve) => {
      this.brandService.createBrands(data.client).subscribe({
        next: (data: any) => {
          const listaDeIdBrands = data.createdBrands.map(p => p.id);
          resolve(listaDeIdBrands);
        },
        error: (err: any) => {
          this.userForm.reset();
          this._dialogRef.close(true);
          resolve([]);
        }
      });
    });
  }



  onSubmit() {
    delete this.formValue.confirm_email;
    delete this.formValue.confirm_password;
    delete this.formValue.client;
    delete this.formValue.brands;
    return this.formValue;
  }

}
