import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { EmailMatchValidator, PasswordMatchValidator } from 'src/app/models/confirmed.validator';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-form-modal-supplier',
  templateUrl: './form-modal-supplier.component.html',
  styleUrls: ['./form-modal-supplier.component.scss']
})
export class FormModalSupplierComponent {

  userForm: FormGroup;
  formValue: any;
  edit: boolean = false;
  view: boolean = false;

  listSupplierSelect = [
    {
      name: 'Proveedor persona natural',
      value: 'PPN'
    },
    {
      name: 'Proveedor persona juridica',
      value: 'PPJ'
    }
  ];

  name: string;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<FormModalSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Client, view: boolean },
    private clientService: ClientService
  ) {
    if(this.data.view){
      this.view = this.data.view;
    }
    this.loadForm();
  }

  ngOnInit() {
    if (this.data.user !== null) {
      this.userForm.patchValue(this.data.user);
      this.edit = true;
    }
  }

  loadForm() {
    this.userForm = this._fb.group({
      legalStatus: [{ value: '', disabled: this.view }],
      employeesNumber: [ { value: undefined, disabled: this.view }],
      contactName: [ { value: '', disabled: this.view }, [Validators.required]],
      contactPersonPicture: [{ value: '', disabled: this.view }],
      contactPersonPosition: [{ value: '', disabled: this.view }, [Validators.required]],
      contactPersonDni: [{ value: '', disabled: this.view }],
      contactPersonCountry: [{ value: '', disabled: this.view }],
      contactPersonCity: [{ value: '', disabled: this.view }],
      contactPersonAddress: [{ value: '', disabled: this.view }],
      contactPersonEmail: [{ value: '', disabled: this.view }, [Validators.required, Validators.email]],
      confirm_email: [{ value: '', disabled: this.view }, [Validators.required]],
      contactPersonPhone: [{ value: '', disabled: this.view }, [Validators.required]],

      margin: [{ value: undefined, disabled: this.view }],
      paymentTerms: [ { value: 0, disabled: this.view } ],
      annualSalesGoal: [ { value: 0, disabled: this.view }],
      annualMonthlyGoals: [ { value: 0, disabled: this.view } ],

      insideUsers: [{ value: '', disabled: this.view }],
      company: [{ value: '', disabled: this.view }],
      password: [{ value: '', disabled: this.view }, [Validators.required]],
      confirm_password: [{ value: '', disabled: this.view }, [Validators.required]],
    },
      {
        validators: Validators.compose([
          EmailMatchValidator('contactPersonEmail', 'confirm_email'), // Validación de email
          PasswordMatchValidator('password', 'confirm_password'), // Validación de contraseña
        ]),
      }
    );
  }

  async saveData() {
    if (this.userForm.valid) {
      this.formValue = { ...this.userForm.value };
      if (this.data) {
        this.editUser();
      } else {
        this.onSubmit();
        this.createUser();
      }
    }
  }

  editUser() {
    this.clientService.updateClient(this.userForm.value, this.data.user.id).subscribe({
      next: (data: any) => {
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  createUser() {
    this.clientService.createClient(this.formValue).subscribe({
      next: (data: any) => {
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        this.userForm.reset();
        console.error(err);
      }
    });
  }

  saveUser(name) {
    this.formValue = { ...this.userForm.value };
    switch (name) {
      case 'CNOPJ':
        delete this.formValue.annualMonthlyGoals;
        delete this.formValue.annualSalesGoal;
        delete this.formValue.contactPersonAddress;
        delete this.formValue.contactPersonCity;

        delete this.formValue.contactPersonCountry;
        delete this.formValue.contactPersonDni;
        delete this.formValue.contactPersonPicture;
        break;
      default:
        break;
    }
  }

  onSubmit() {
    delete this.formValue.confirm_email;
    delete this.formValue.confirm_password;
  }

}
