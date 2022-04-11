import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private _snackBar: MatSnackBar){}

    success(message: string) {
        this.openSnackBar(message, AlertType.Success);
    }

    error(message: string) {
      this.openSnackBar(message, AlertType.Error);
    }

    info(message: string) {
      this.openSnackBar(message, AlertType.Info);
    }

    warn(message: string) {
      this.openSnackBar(message, AlertType.Warning);
    }

    openSnackBar(message: string, type: AlertType) {
      this._snackBar.open(message, "OK", {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: [AlertType[type].toLowerCase()]
     });
    }

}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
