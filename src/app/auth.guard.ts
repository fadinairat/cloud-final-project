import { ActivatedRouteSnapshot,Router,  CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';

// export const authGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor (private _authService: AuthService, private _router: Router){}

    canActivate():boolean {
        if(this._authService.getToken()){
          return true;
        }
        else{
          this._router.navigate(['/login']);
          return true;
        }
    }
}