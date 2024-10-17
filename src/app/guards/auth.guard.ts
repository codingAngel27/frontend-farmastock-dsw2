import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    router.navigate(['/iniciar-sesion']);
    return false; 
  }

  return true;
};
