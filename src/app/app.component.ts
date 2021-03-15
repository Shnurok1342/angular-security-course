import {AuthFacadeService} from './services/auth-facade.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private authService: AuthFacadeService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));
  }

  signUp() {
    this.authService.signUp();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
