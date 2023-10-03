import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from 'src/app/models/client';
import { FormModalSupplierComponent } from '../form-modal-supplier/form-modal-supplier.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.scss']
})
export class ListSupplierComponent {

  @Input() listUser: Client[];
  @Input() columns: string[];
  @Input() tabs: boolean;

  @Output() deleteId = new EventEmitter<string>();
  @Output() loadTable = new EventEmitter();

  constructor(
    private _dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(FormModalSupplierComponent, {
      data: { user: data, view : false},
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadTable.emit();
        }
      },
    });
  }

  openViewForm(data: any, view : boolean) {
    const dialogRef = this._dialog.open(FormModalSupplierComponent, {
      data: { user: data, view : view},
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadTable.emit();
        }
      },
    });
  }

  deleteSupplier(id){
    this.deleteId.emit(id);
  }
}
