import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const { value } = control;

    const hasLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#?]/.test(value);

    const isValid =
      hasLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

    return !isValid && value.length > 0 ? { passwordStrength: true } : null;
  };
}