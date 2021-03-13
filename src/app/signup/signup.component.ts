import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../common/forms.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  errors: string[] = [];

  readonly messagePerErrorCode = {
    min: 'The minimum length is 10 characters',
    lowercase: 'At least one lower case character',
    uppercase: 'At least one upper case character',
    digits: 'At least one numeric character'
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['test@gmail.com', Validators.required],
      password: ['Password10', Validators.required],
      confirm: ['Password10', Validators.required]
    });
  }

  ngOnInit() {}

  signUp() {
    const val = this.form.value;
    if (val.email && val.password && val.password === val.confirm) {
      this.authService.signUp(val.email, val.password)
        .subscribe(
          () => {
            console.log('User create successfully');
            this.router.navigateByUrl('/');
          },
          response => this.errors = response.error
        );
    }
  }
}
