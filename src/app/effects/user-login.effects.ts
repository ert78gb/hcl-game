import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {go} from '@ngrx/router-store';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import {
  ActionTypes,
  AutoLoginUserAction,
  AutoLoginUserSuccessAction,
  LoginUserFailedAction,
  LoginUserSuccessAction
} from '../actions/user-login.actions';
import {UserRepositoryService} from '../services/user-repository.service';
import {User} from '../models/user.model';

@Injectable()
export class UserLoginEffects {

  @Effect() autoLoginUser$: Observable<Action> = this.actions$
    .ofType(ActionTypes.AUTO_LOGIN_USER)
    .startWith(new AutoLoginUserAction())
    .switchMap(() => {
      const item = localStorage.getItem('logged_user');
      if (!item) {
        return Observable.empty();
      }

      try {
        const user = JSON.parse(item);
        if (!user.username || !user.password) {
          return Observable.empty();
        }
        return Observable.of(new AutoLoginUserSuccessAction(user))

      } catch (err) {
        return Observable.empty();
      }
    })
  ;

  @Effect() loginUser$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOGIN_USER)
    .map(toPayload)
    .switchMap((user: User) => this.userService.getByUsername(user.username)
      .switchMap((existsUser: User) => {
        if (!existsUser) {
          return Observable.throw('Wrong username or password');
        }

        if (existsUser.username !== user.username || existsUser.password !== user.password) {
          return Observable.throw('Wrong username or password');
        }

        return Observable.of(new LoginUserSuccessAction(existsUser))
      })
      .catch(err => Observable.of(new LoginUserFailedAction(err)))
    );

  @Effect() loginSuccess$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOGIN_USER_SUCCESS)
    .map(toPayload)
    .switchMap((user) => {
      localStorage.setItem('logged_user', JSON.stringify(user));
      return Observable.of(go('play-game'));
    });

  constructor(private actions$: Actions,
              private userService: UserRepositoryService) {
  }
}
