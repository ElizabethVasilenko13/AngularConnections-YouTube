import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SignUpService } from '@auth/services/sign-up.service';

@Component({
  selector: 'app-registartion-form',
  templateUrl: './registartion-form.component.html',
  styleUrls: ['./registartion-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistartionFormComponent implements OnInit, OnDestroy {
  isSubmitting$ = this.signUpService.isSubmitting$;
  backendError$ = this.signUpService.backendError$;
  isSubmitFormButtonDisable$ = this.signUpService.isSubmitFormButtonDisable$;
  constructor(public signUpService: SignUpService) {}

  ngOnInit(): void {
    this.signUpService.resetSignUp();
    this.signUpService.initFormValueChanges();
  }

  ngOnDestroy(): void {
    this.signUpService.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
