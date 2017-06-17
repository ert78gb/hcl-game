import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {Store} from '@ngrx/store';

import {getRegisterError, State} from '../../reducers';
import {RegisterUserAction} from '../../actions/user-register.actions';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterUserComponent implements OnInit {
  error$: Observable<string>;

  form: FormGroup;

  errors = {
    username: {
      required: 'Username is required'
    },
    password: {
      required: 'Password is required',
      pattern: 'Your password must be at least 8 characters and should contains numeric, ' +
      'lower case, upper case and minimum one of special character: !@#$%^&amp;*()_+'
    },
    confirmPassword: {
      required: 'Confirm password is required'
    }
  };

  constructor(private fb: FormBuilder,
              private store: Store<State>) {
    this.error$ = store.select(getRegisterError);

    const passwordControl = new FormControl('', [Validators.required, Validators.pattern(environment.passwordPattern)]);

    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: passwordControl,
      confirmPassword: new FormControl('', [Validators.required, CustomValidators.equalTo(passwordControl)]),
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(new RegisterUserAction(this.form.value))
  }
}
