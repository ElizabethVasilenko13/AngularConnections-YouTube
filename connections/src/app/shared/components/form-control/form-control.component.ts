import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AuthError } from '@shared/types/user';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent {
  @Input() label = 'Label';
  @Input() className = 'form-group';
  @Input() controlName = '';
  @Input() control: AbstractControl | null = null;
  @Input() isRequired = false;
  @Input() type = 'text';
  @Input() backendError: AuthError | null = null;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() placeholder = '';

  isInvalid(): boolean {
    const isControlInvalidAndTouched =
      !this.readonly &&
      !!this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched);
    const isBackendErrorPresentAndTouched =
      !!this.backendError &&
      !!this.control &&
      (this.control.dirty || this.control.touched);

    return isControlInvalidAndTouched || isBackendErrorPresentAndTouched;
  }
  get errors(): string[] {
    const { control } = this;
    const errorMessages: string[] = [];
    if (control?.errors) {
      Object.entries(control.errors).forEach((error) => {
        const [key, message] = error;

        switch (key) {
          case 'required':
            errorMessages.push(`The ${this.controlName.toLowerCase()} is required.`);
            break;
          case 'minlength':
            errorMessages.push(
              `The ${this.controlName.toLowerCase()} is too short. Min length - ${
                message.requiredLength
              }`,
            );
            break;
          case 'maxlength':
            errorMessages.push(
              `The ${this.controlName.toLowerCase()} is too long. Max length - ${
                message.requiredLength
              }`,
            );
            break;
          case 'email':
            errorMessages.push(
              `The ${this.controlName.toLowerCase()} email is invalid`,
            );
            break;
          default:
            if (key === 'pattern') {
              if (this.controlName === 'password') {
                errorMessages.push(`Your password isn't strong enough (
                  at least 1 capital letter, at least 1 digit and at least 1 special symbol
                  )`);
              } else if (this.controlName === 'name') {
                errorMessages.push(
                  `Your name is invalid allowed only letters or spaces`,
                );
              }
            } else {
              errorMessages.push(`The ${this.controlName.toLowerCase()} is invalid`);
            }
        }
      });
    }
    return errorMessages;
  }
}
