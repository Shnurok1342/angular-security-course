import {Inject, Injectable} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  readonly isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthService
  ) {}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ returnTo: document.location.origin });
  }
}
