import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent,{
        width: '350px',
        panelClass: 'confirm-dialog-container',
        position: { top: "10px" },
        data :{
          message : msg
        }
      });
  }
}
