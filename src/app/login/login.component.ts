import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../common/forms.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.authService.login(formValue.email, formValue.password).subscribe(
        () => {
          console.log('User logged in successfully');
          this.router.navigateByUrl('/');
        },
        () => this.error = 'Login Failed!'
      );
    }
  }
}
