import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-client-natural-person',
  templateUrl: './client-natural-person.component.html',
  styleUrls: ['./client-natural-person.component.scss']
})
export class ClientNaturalPersonComponent {

  @Input() userForm: FormGroup;
  @Input() edit: boolean;

  listCompanies: Company[] = [];

  constructor(
    private companyService: CompanyService
  ) {
    this.loadCompaies();
  }

  loadCompaies() {
    this.companyService.getList().subscribe({
      next: (data) => {
        this.listCompanies = data.filter(c => c.legalCapacity === "Natural");
      },
      error: () => {
        this.listCompanies = [];
      }
    })
  }

  changeEmail(id){
    const email = this.listCompanies.filter(c => c.id === id)[0].billingEmail;
    this.userForm.get("client.billingEmail").setValue(email);
  }

}
