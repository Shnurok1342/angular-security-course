import {User} from '../model/user';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, map, shareReplay, tap} from 'rxjs/operators';

const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
};

@Injectable()
export class AuthService {
  private userSubject = new BehaviorSubject<User>(undefined);
  user$: Observable<User> = this.userSubject.asObservable().pipe(filter(user => !!user));
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(u => !!u.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient) {
    this.getUser();
  }

  getUser() {
    this.http.get<User>('api/user')
      .subscribe(user => this.userSubject.next(user ? user : ANONYMOUS_USER));
  }

  signUp(email: string, password: string) {
    return this.http.post<User>('api/signup', {email, password})
      .pipe(
        shareReplay(),
        tap(user => this.userSubject.next(user))
      );
  }

  login(email: string, password: string) {
    return this.http.post<User>('api/login', {email, password})
      .pipe(
        shareReplay(),
        tap(user => this.userSubject.next(user))
      );
  }

  logout() {
    return this.http.post('api/logout', null)
      .pipe(
        shareReplay(),
        tap(() => this.userSubject.next(ANONYMOUS_USER))
      );
  }
}
