import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MAIN_PAGE_ROUTE } from '@core/constants/routing';
import { AuthService } from '@core/services/auth.service';

export const AuthRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn.value) {
    router.navigate([MAIN_PAGE_ROUTE]);
    return false;
  }
  return true;
};
