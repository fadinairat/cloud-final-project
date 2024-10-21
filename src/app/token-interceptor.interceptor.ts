import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const _authToken = inject(AuthService).getToken()
  if(_authToken[1]){
    console.log(jwtDecode(_authToken[1]))
  }
  

  if (_authToken[1]) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${_authToken[1]}`
      }
    });
  }

  return next(req);
}