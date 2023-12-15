import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyStyles } from '@shared/enums/notify.enum';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}
  openSnackBar(
    message = 'Oops... Temporary Server Error :(',
    statusStyle = NotifyStyles.Success,
  ): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', statusStyle],
    });
  }
}
