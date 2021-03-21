import {FactoryProvider, Injectable, InjectionToken} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {first, map, tap} from 'rxjs/operators';
import * as _ from 'lodash';

export const ADMINS_ONLY_GUARD_TOKEN = new InjectionToken('adminsOnlyGuard');
export const adminsOnlyGuardFactoryProvider: FactoryProvider = {
  provide: ADMINS_ONLY_GUARD_TOKEN,
  useFactory: (
    authService: AuthService,
    router: Router
  ) => new AuthorizationGuard(['ADMIN'], authService, router),
  deps: [AuthService, Router]
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private allowedRoles: string[],
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.user$
      .pipe(
        map(user => _.intersection(this.allowedRoles, user.roles).length > 0),
        first(),
        tap(isAllowed => {
          if (!isAllowed) {
            this.router.navigateByUrl('/');
          }
        })
      );
  }
}
