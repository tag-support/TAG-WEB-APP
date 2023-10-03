import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { CompanyService } from '../../../../../../../services/company.service';

@Component({
  selector: 'app-client-legal-entity',
  templateUrl: './client-legal-entity.component.html',
  styleUrls: ['./client-legal-entity.component.scss']
})
export class ClientLegalEntityComponent {

  @Input() userForm: FormGroup;
  @Input() edit: boolean;

  listCompanies: Company[] = [];
  nit = new FormControl('');


  constructor(
    private companyService : CompanyService
  ){
    this.nit.disable();
    this.loadCompaies();
  }

  loadCompaies(){
    this.companyService.getList().subscribe({
      next : (data) => {
        this.listCompanies = data.filter(c => c.legalCapacity === "Juridica");
      },
      error : () =>{
        this.listCompanies = [];
      }
    })
  }
  
  loadNit(id){
    const email = this.listCompanies.filter(c => c.id === id)[0].billingEmail;
    this.userForm.get("client.billingEmail").setValue(email);
    
    const nit = this.listCompanies.filter(c => c.id === id)[0].nit;
    this.nit.setValue(nit);
  }
  
}
