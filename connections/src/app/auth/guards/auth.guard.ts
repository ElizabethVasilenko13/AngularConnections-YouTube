import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH_ROUTE, LOGIN_PAGE_ROUTE } from '@core/constants/routing';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn.value) {
    return true;
  }
  router.navigateByUrl(`/${AUTH_ROUTE}/${LOGIN_PAGE_ROUTE}`);
  return false;
};
