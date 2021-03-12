import {User} from '../model/user';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
};

@Injectable()
export class AuthService {
  private userSubject = new BehaviorSubject<User>(ANONYMOUS_USER);
  user$: Observable<User> = this.userSubject.asObservable();
  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {

  }

}
