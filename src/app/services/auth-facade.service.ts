import {Inject, Injectable} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {DbUser, UserInfo} from '../model/dbUser';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  private userInfo = new BehaviorSubject<UserInfo>(undefined);

  readonly isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;
  readonly isLoading$: Observable<boolean> = this.auth.isLoading$;
  readonly userInfo$: Observable<UserInfo> = this.userInfo.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.checkForUserInfo();
    this.userInfo$.subscribe(console.log);
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

  checkForUserInfo() {
    this.auth.user$
      .pipe(
        filter(u => Boolean(u)),
        switchMap(auth0User => this.http.put<DbUser>('/api/userinfo', null)
          .pipe(map(dbUser => ({ auth0: auth0User, db: dbUser })))
        )
      )
      .subscribe((user: UserInfo) => this.userInfo.next(user));
  }
}
