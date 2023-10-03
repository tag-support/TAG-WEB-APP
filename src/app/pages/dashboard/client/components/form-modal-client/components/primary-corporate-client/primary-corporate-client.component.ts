import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-primary-corporate-client',
  templateUrl: './primary-corporate-client.component.html',
  styleUrls: ['./primary-corporate-client.component.scss']
})
export class PrimaryCorporateClientComponent {

  @Input() userForm: FormGroup;
  @Input() edit: boolean;

  listCompanies: Company[] = [];
  marcas: any[] = [];

  url = new FormControl('');
  iva = new FormControl();
  emailC = new FormControl('');



  constructor(
    private _fb: FormBuilder,
    private companyService: CompanyService
  ) {
    this.url.disable();
    this.iva.disable();
    this.emailC.disable();
    this.loadCompaies();
  }

  loadCompaies() {
    this.companyService.getList().subscribe({
      next: (data) => {
        this.listCompanies = data.filter(c => c.legalCapacity === "Juridica");
      },
      error: () => {
        this.listCompanies = [];
      }
    })
  }

  changeEmail(id){
    const company : Company = this.listCompanies.filter(c => c.id === id)[0];
    this.url.setValue(company.webUrl);
    this.iva.setValue(company.ivaResponsable);
    this.emailC.setValue(company.billingEmail);
    this.userForm.get("client.billingEmail").setValue(company.billingEmail);
  }

  get marcasControls() {
    return (this.userForm.get('brands') as FormArray).controls;
  }

  agregarMarcas() {
    const control = (this.userForm.get('brands') as FormArray);
    control.push(this.initAddress());
  }

  eliminarMarcas(i: number) {
    const control = (this.userForm.get('brands') as FormArray);
    control.removeAt(i);
  }

  initAddress() {
    return this._fb.group({
      name: [''],
      fee: ['']
    });
  }
}


