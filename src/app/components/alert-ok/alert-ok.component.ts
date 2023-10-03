import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-ok',
  templateUrl: './alert-ok.component.html',
  styleUrls: ['./alert-ok.component.scss']
})
export class AlertOkComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {message: string, title : string},
    private dialogRef: MatDialogRef<AlertOkComponent>,
  ){}

  closeDialog() {
    this.dialogRef.close(true);
  }

}
