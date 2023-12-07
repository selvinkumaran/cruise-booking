import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

// Define a canActivate function for the authentication guard
export const authGuard: CanActivateFn = (route, state) => {
  // Inject the AuthService and Router
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in
  if (!authService.isLoggedIn()) {
    // Redirect to the login page if not logged in
    router.navigate(['/login'], { replaceUrl: true });
  }

  // Return whether the user is logged in or not
  return authService.isLoggedIn();
};
