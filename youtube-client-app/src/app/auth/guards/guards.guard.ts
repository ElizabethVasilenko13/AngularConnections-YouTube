import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH_PAGE_ROUTE } from '@core/consts';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn.value) return true;
  router.navigate([AUTH_PAGE_ROUTE]);
  return false;
};
