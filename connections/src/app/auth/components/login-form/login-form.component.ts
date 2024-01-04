import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SignInService } from '@auth/services/sign-in.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit, OnDestroy {
  isSubmitting$ = this.signInService.isSubmitting$;
  backendError$ = this.signInService.backendError$;
  isSubmitFormButtonDisable$ = this.signInService.isSubmitFormButtonDisable$;

  constructor(
    public signInService: SignInService,
  ) {}

  ngOnInit(): void {
    this.signInService.resetSignIn();
    this.signInService.initFormValueChanges();
  }

  ngOnDestroy(): void {
    this.signInService.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
