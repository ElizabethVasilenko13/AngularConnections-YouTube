import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class SignUpService {
  registrationForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^[a-zA-Z\s]+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        ),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {}
}
