import {User} from '../model/user';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay, tap} from 'rxjs/operators';

const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
};

@Injectable()
export class AuthService {
  private userSubject = new BehaviorSubject<User>(ANONYMOUS_USER);
  user$: Observable<User> = this.userSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(u => !!u.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<User>('api/signup', {email, password})
      .pipe(
        shareReplay(),
        tap(user => this.userSubject.next(user))
      );
  }

}
