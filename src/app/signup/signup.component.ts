import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';


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
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  ngOnInit() {}

  signUp() {
    const val = this.form.value;
    if (val.email && val.password && val.password === val.confirm) {
      this.authService.signUp(val.email, val.password)
        .subscribe(
          () => console.log('User create successfully'),
          response => this.errors = response.error
        );
    }
  }
}
