import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {AuthFacadeService} from '../services/auth-facade.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {filter, first, mapTo} from 'rxjs/operators';

@Injectable()
export class AuthLoadResolver implements Resolve<boolean> {
  constructor(private authService: AuthFacadeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> {
    return this.authService.isLoading$
      .pipe(
        filter(loading => !loading),
        mapTo(true),
        first()
      );
  }
}
