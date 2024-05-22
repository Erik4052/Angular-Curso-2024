import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

 /*  const url = state.url;
  console.log('url', url);
  localStorage.setItem('url',url); */

  const authService = inject(AuthService);
  const router = inject(Router);

  //TODO: CHECK THIS FEATURE, AT THE MOMENT THIS IS NOT WORKING PROPERTLY
  if(authService.authStatus() === AuthStatus.authenticated) return true;

 // if(authService.authStatus() === AuthStatus.checking) return false;

  router.navigateByUrl('/auth/login');
  return false;
};
