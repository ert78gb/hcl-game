import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ActionTypes, RegisterUserFailedAction, RegisterUserSuccessAction} from '../actions/user-register.actions';
import {UserRegister} from '../models/user-register.model';
import {UserRepositoryService} from '../services/user-repository.service';
import {User} from '../models/user.model';
import {LoginUserAction} from '../actions/user-login.actions';

@Injectable()
export class UserRegisterEffects {

  @Effect() registerNewUser$: Observable<Action> = this.actions$
    .ofType(ActionTypes.REGISTER_USER)
    .map(toPayload)
    .switchMap((user: UserRegister) => this.userService.getByUsername(user.username)
      .switchMap((existsUser: User) => {
        if (existsUser) {
          return Observable.throw('Username is already used!');
        }

        return this.userService.save(user)
          .map((newUser: User) => new RegisterUserSuccessAction(newUser))
      })
      .catch(err => Observable.of(new RegisterUserFailedAction(err)))
    );

  @Effect() registerUserSuccess$: Observable<Action> = this.actions$
    .ofType(ActionTypes.REGISTER_USER_SUCCESS)
    .map(toPayload)
    .switchMap((user: User) => Observable.of(new LoginUserAction(user)));

  constructor(private actions$: Actions,
              private userService: UserRepositoryService) {
  }
}
