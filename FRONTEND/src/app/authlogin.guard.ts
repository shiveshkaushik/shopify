import { CanActivateFn ,Router} from '@angular/router';
import { inject } from '@angular/core';

export const authloginGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router)
  let token = localStorage.getItem('angulartoken');
  if(token){
  _router.navigate(['dashboard']);
  return false;
  }
  return true;
};
