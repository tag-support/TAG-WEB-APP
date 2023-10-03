import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-supplier-natural-person',
  templateUrl: './supplier-natural-person.component.html',
  styleUrls: ['./supplier-natural-person.component.scss']
})
export class SupplierNaturalPersonComponent {

  @Input() userForm: FormGroup;
  @Input() edit: boolean;

}
