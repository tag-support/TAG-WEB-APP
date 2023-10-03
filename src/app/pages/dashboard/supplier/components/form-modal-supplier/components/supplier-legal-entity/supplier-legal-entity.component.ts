import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-supplier-legal-entity',
  templateUrl: './supplier-legal-entity.component.html',
  styleUrls: ['./supplier-legal-entity.component.scss']
})
export class SupplierLegalEntityComponent {

  @Input() userForm: FormGroup;
  @Input() edit: boolean;
}
