import {Inject, Injectable} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';
import {Observable, of} from 'rxjs';
import {GetTokenSilentlyOptions} from '@auth0/auth0-spa-js';
import {catchError} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  readonly isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;
  readonly isLoading$: Observable<boolean> = this.auth.isLoading$;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthService
  ) {}

  getAccessTokenSilently(options?: GetTokenSilentlyOptions): Observable<string | undefined> {
    return this.auth.getAccessTokenSilently(options).pipe(catchError(() => of(undefined)));
  }

  signUp() {
    this.auth.loginWithRedirect({ screen_hint: 'signup' });
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ returnTo: this.document.location.origin });
  }
}
