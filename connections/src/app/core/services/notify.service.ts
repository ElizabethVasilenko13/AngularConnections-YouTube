import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotifyStyles } from '@shared/enums/notify.enum';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private queue: { message: string; style: NotifyStyles; duration: number }[] = [];
  private isOpen = false;

  constructor(private snackBar: MatSnackBar) {}

  addMessage(
    message = 'Oops... Temporary Server Error :(',
    style = NotifyStyles.Success,
    duration = 2000,
  ): void {
    this.queue.push({ message, style, duration });
    this.showSnackbar();
  }

  private showSnackbar(): void {
    if (!this.isOpen && this.queue.length > 0) {
      const snack = this.queue.shift();
      if (snack) {
        const { message, style, duration } = snack;
        const config = new MatSnackBarConfig();
        config.duration = duration;
        config.horizontalPosition = 'right';
        config.verticalPosition = 'bottom';
        config.panelClass = ['custom-snackbar', style];

        const snackBarRef = this.snackBar.open(message, 'Close', config);

        snackBarRef.afterDismissed().subscribe(() => {
          this.isOpen = false;
          this.showSnackbar();
        });

        this.isOpen = true;
      }
    }
  }
}
