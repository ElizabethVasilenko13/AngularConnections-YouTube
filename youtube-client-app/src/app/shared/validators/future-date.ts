import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    const selectedDate = new Date(value);
    const currentDate = new Date();

    return selectedDate > currentDate ? { futureDate: true } : null;
  };
}