import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent {
  @Input() label = '';
  @Input() controlName = '';
  @Input() control:  AbstractControl | null= null;
  @Input() isRequired = false;
  @Input() type = 'text';

  isInvalid(): boolean {
    console.log(this.control);
    return !!this.control && this.control.invalid && (this.control.dirty || this.control.touched);
  }

  get errors(): string[] {
    const { control } = this;
    const errorMessages: string[] = [];
    if (control?.errors) {
      Object.keys(control.errors).forEach((key) => {
        switch (key) {
          case 'required':
            errorMessages.push('Please enter a value.');
            break;
          case 'minlength':
            errorMessages.push(`The ${this.label.toLowerCase()} is too short.`);
            break;
          case 'maxlength':
            errorMessages.push(`The ${this.label.toLowerCase()} is too long.`);
            break;
          case 'passwordStrength':
            errorMessages.push(`Your password isn't strong enough (at least: 8 characters,
              1 number,
              one special character, e.g., ! @ # ?,
              uppercase and lowercase letters)`);
            break;
          default: errorMessages.push(`The ${this.label.toLowerCase()} is invalid`)
        }
      });
    }
    return errorMessages;
  }
}
