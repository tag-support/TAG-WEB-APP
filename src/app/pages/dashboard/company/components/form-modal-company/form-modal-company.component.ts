import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-form-modal-company',
  templateUrl: './form-modal-company.component.html',
  styleUrls: ['./form-modal-company.component.scss']
})
export class FormModalCompanyComponent implements OnInit{

  empForm: FormGroup;

  dataSend: FormData = new FormData();

  @ViewChild('getDNI') inputFileDNI: ElementRef;
  @ViewChild('getFileCamaraComercio') inputFileCamera: ElementRef;
  @ViewChild('getFileRUT') inputFileRUT: ElementRef;

  fileDNI: string;
  fileCamaraComercio: string;
  fileRUT: string;


  selectedFile: any = null;

  view = false;

  userType = [
    'Cliente',
    'Proveedor producto',
    'Proveedor marcaje',
    'Proveedor transportador'
  ]

  typeCompany = [
    'Juridica',
    'Natural'
  ]

  documentType = [
    'C.C',
    'NIT'
  ]

  listCity = [
    'Bogotá',
    'Medellín',
    'Cartagena',
    'Cali'
  ]

  listCountry = [
    'Colombia',
    'USA'
  ]

  

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<FormModalCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { company : any, view : boolean},
    private companyService : CompanyService
  ) {
    if(this.data.view){      
      this.view = this.data.view;
    }
    this.loadForm();
  }

  ngOnInit(): void {
    
    this.empForm.patchValue(this.data.company);
    if(this.data !== null){
      this.fileDNI = this.empForm.get("dniRepresentativeDocument").value;
      this.fileCamaraComercio = this.empForm.get("commerceChamberDocument").value;
      this.fileRUT = this.empForm.get("rutCompanyDocument").value;
    }
  }

  loadForm() {
    this.empForm = this._fb.group({
      name: [{ value: '', disabled: this.view }],
      webUrl: [{ value: '', disabled: this.view }],
      legalCapacity: [{ value: '', disabled: this.view }],
      nit: [{ value: '', disabled: this.view }],
      country: [{ value: '', disabled: this.view }],
      city: [{ value: '', disabled: this.view }],
      address: ['Cra 78'],
      billingEmail: [{ value: '', disabled: this.view }],
      deliveryAddress: [{ value: '', disabled: this.view }],
      documentType: [{ value: '', disabled: this.view }],
      companyType: [{ value: '', disabled: this.view }],
      ivaResponsable: [{ value: '', disabled: this.view }],
      taxPayer: [{ value: '', disabled: this.view }],
      selfRetaining: [{ value: '', disabled: this.view }],

      dniRepresentativeDocument: [{ value: '', disabled: this.view }],
      commerceChamberDocument: [{ value: '', disabled: this.view }],
      rutCompanyDocument: [{ value: '', disabled: this.view }],

      postalCode : ['50005'],
      gpsLocation : ['95 95'],
      mainAddress : ['Cra 32'],      
    });
  }

  async saveData(){
    if (this.empForm.valid) {
      await this.addFormData(this.empForm.value);
      if (this.data) {
        this.editCompany();
      }else {
        this.createCompany();        
      }
    }
  }

  editCompany(){
    this.dataSend.delete('nit');
    this.companyService.updateCompany(this.dataSend, this.data.company.id).subscribe({
      next : (data : any) => {
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        this.dataSend = new FormData();
        console.error(err);
      }
    });
  }

  createCompany(){
    this.companyService.createCompany(this.dataSend).subscribe({
      next : (data : any) => {
        this._dialogRef.close(true);        
      },
      error: (err: any) => {
        this.dataSend = new FormData();
        this.empForm.reset();
        console.error(err);
      }
    });
  }

  downloadFile(name){
    if(this.view){
      this.companyService.downloadfileCompany(this.empForm.get(name).value).subscribe((data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.empForm.get(name).value
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }

  async addFormData(objeto) {
    for (var key in objeto) {
      if (key !== 'dniRepresentativeDocument' && key !== 'commerceChamberDocument' && key !== 'rutCompanyDocument') {
        this.dataSend.append(key, objeto[key]);
      }
    }
  }

  // AGREGAR ARCHIVOS
  onDniRepresentativeDocument(event) {
    const file = <File>event.target.files[0];
    this.fileDNI = file.name;
    this.empForm.get("dniRepresentativeDocument").setValue(file.name);
    this.dataSend.append('dniRepresentativeDocument', file,);
  }

  onCommerceChamberDocument(event) {
    const file = <File>event.target.files[0];
    this.fileCamaraComercio = file.name;
    this.empForm.get("commerceChamberDocument").setValue(file.name);
    this.dataSend.append('commerceChamberDocument', file,);
  }

  onRutCompanyDocument(event) {
    const file = <File>event.target.files[0];
    this.fileRUT = file.name;
    this.empForm.get("rutCompanyDocument").setValue(file.name);
    this.dataSend.append('rutCompanyDocument', file,);
  }

  // AGREGAR ARCHIVOS
  clearDniRepresentativeDocument() {    
    this.fileDNI = undefined;
    this.dataSend.delete('dniRepresentativeDocument');
    this.empForm.get("dniRepresentativeDocument").setValue('');
    this.inputFileDNI.nativeElement.value = "";
  }

  clearCommerceChamberDocument() {
    this.fileCamaraComercio = undefined;
    this.dataSend.delete('commerceChamberDocument');
    this.empForm.get("commerceChamberDocument").setValue('');
    this.inputFileCamera.nativeElement.value = "";
  }

  clearRutCompanyDocument() {
    this.fileRUT = undefined;
    this.dataSend.delete('rutCompanyDocument');
    this.empForm.get("rutCompanyDocument").setValue('');
    this.inputFileRUT.nativeElement.value = "";
  }
}
