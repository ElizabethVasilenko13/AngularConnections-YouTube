import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { sighUpAction } from '../../store/auth.actions';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from '../../store/auth.selectors';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/)
      ]]
    });
  }

  onSubmit(): void {
    this.store.dispatch(sighUpAction());
    console.log(this.registrationForm.value);
  }

}
