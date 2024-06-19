import { HttpInterceptorFn } from '@angular/common/http';

export const tokenAuthInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('angulartoken');
  console.log("HTTP Request intec")
  if(token){
    req = req.clone({
      setHeaders:{
        'Authorization': 'Bearer' + token,
        'Content-type': 'application/json'
      }
    })
  }
  return next(req);
};




















/*
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const tokenAuthInterceptor: HttpInterceptor = {
  intercept: (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    const token = localStorage.getItem('angulartoken');

    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
};

*/