import {AuthService} from './services/auth.service';
import {User} from './model/user';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
  }
}
