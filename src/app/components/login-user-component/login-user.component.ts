import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {go} from '@ngrx/router-store';

import {getLoginError, State} from '../../reducers/index';
import {LoginUserAction} from '../../actions/user-login.actions';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginUserComponent {

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
    }
  };

  constructor(private fb: FormBuilder,
              private store: Store<State>) {
    this.error$ = store.select(getLoginError);

    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(environment.passwordPattern)])
    })
  }

  onSubmit() {
    this.store.dispatch(new LoginUserAction(this.form.value))
  }

  register() {
    this.store.dispatch(go('register'))
  }
}
