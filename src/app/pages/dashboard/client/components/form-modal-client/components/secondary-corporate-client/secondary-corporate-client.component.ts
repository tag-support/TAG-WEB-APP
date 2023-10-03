import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Brand } from 'src/app/models/brand';
import { map } from 'rxjs/operators';
import { startWith } from 'rxjs';
import { BrandService } from '../../../../../../../services/brand.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-secondary-corporate-client',
  templateUrl: './secondary-corporate-client.component.html',
  styleUrls: ['./secondary-corporate-client.component.scss']
})
export class SecondaryCorporateClientComponent implements OnInit {

  @Input() userForm: FormGroup;
  @Input() edit: boolean;

  @Output() propagar = new EventEmitter<Brand[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  brandsCtrl = new FormControl('');
  brandBool = true;
  brandsList: Brand[];
  selectedBrands: Brand[] = [];

  listCompanies: Company[] = [];

  constructor(
    private _fb: FormBuilder,
    private brandService: BrandService,
    private companyService: CompanyService
  ) {
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

  ngOnInit() {
    this.loadBrands(this.userForm.get('company').value);
  }


  loadBrands(id) {
    if (id !== '') {
      this.brandBool = false;
      this.brandsCtrl.valueChanges
        .pipe(map(value => typeof value === 'object' ? '' : ''), startWith(''))
        .subscribe(async value => {
          const data: Brand[] = await this.brandService.getList().toPromise();
          this.brandsList = data.filter(b => b.companyId === id && b.isActive === true);
        });
    } else {
      this.selectedBrands = [];
      this.brandBool = true;
    }
  }

  changeEmail(id) {
    const company: Company = this.listCompanies.filter(c => c.id === id)[0];
    this.userForm.get("client.billingEmail").setValue(company.billingEmail);
    this.loadBrands(id);
  }

  removeB(brands: Brand): void {
    this.selectedBrands = [...this.selectedBrands.filter(p => p.id !== brands.id)];
    //this.propagar.emit(this.selectedBrands);
  }

  selectedB(event: MatAutocompleteSelectedEvent): void {
    const brands = event.option.value as Brand
    if (this.selectedBrands.findIndex(p => p.id === brands.id) < 0) {
      this.selectedBrands.push(brands);
      //this.propagar.emit(this.selectedBrands);
    } else {
      this.removeB(brands);
    }
  }

  checkSeledBrands(brands: Brand) {
    return this.selectedBrands.findIndex(p => p.id === brands.id) > -1;
  }

}
