import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-nav',
  templateUrl: './dialog-nav.component.html',
  styleUrls: ['./dialog-nav.component.sass'],
})
export class DialogNavComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogNavComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
