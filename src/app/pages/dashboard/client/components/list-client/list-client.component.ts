import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/models/client';
import { FormModalClientComponent } from '../form-modal-client/form-modal-client.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent {

  @Input() listUser: User[];
  @Input() columns: string[];
  @Input() tabs: boolean;

  @Output() deleteId = new EventEmitter<string>();
  @Output() loadTable = new EventEmitter();

  constructor(
    private _dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(FormModalClientComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadTable.emit();
        }
      },
    });
  }

  deleteClient(id){
    this.deleteId.emit(id);
  }
}
