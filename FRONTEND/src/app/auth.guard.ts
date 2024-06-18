import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  let token = localStorage.getItem('angulartoken');
  let currentUrl = _router.url;

  if (!token && !currentUrl.includes('/login') && !currentUrl.includes('/register')) {
    _router.navigate(['/login']);
    return false;
  }

  return true;
};
