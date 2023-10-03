import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Permissions } from 'src/app/models/permissions';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit{
  
  @Input() userForm: FormGroup;
  @Input() edit: boolean;
  @Input() permissions: Permissions[];

  @Output()
  propagar = new EventEmitter<Permissions[]>();



  ngOnInit() {
    this.loadPermisos();
  }

  loadPermisos(){    
    this.propagar.emit(this.permissions);
  }


}
