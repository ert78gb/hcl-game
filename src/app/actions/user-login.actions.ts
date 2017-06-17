import {Action} from '@ngrx/store';

import {type} from '../utils';
import {User} from '../models/user.model';

const PREFIX = '[user-login] ';

export const ActionTypes = {
  AUTO_LOGIN_USER: type(PREFIX + 'Auto login user'),
  AUTO_LOGIN_USER_SUCCESS: type(PREFIX + 'Auto login user sucess'),
  LOGIN_USER: type(PREFIX + 'Login user'),
  LOGIN_USER_SUCCESS: type(PREFIX + 'Login user success'),
  LOGIN_USER_FAILED: type(PREFIX + 'Login user failed')
};

export class AutoLoginUserAction implements Action {
  readonly type = ActionTypes.AUTO_LOGIN_USER;

}

export class AutoLoginUserSuccessAction implements Action {
  readonly type = ActionTypes.AUTO_LOGIN_USER_SUCCESS;
  constructor(public payload: User) {
  }

}

export class LoginUserAction implements Action {
  readonly type = ActionTypes.LOGIN_USER;

  constructor(public payload: User) {
  }
}

export class LoginUserSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoginUserFailedAction implements Action {
  readonly type = ActionTypes.LOGIN_USER_FAILED;

  constructor(public payload: any) {
  }
}

export type Actions
  = AutoLoginUserAction
  | AutoLoginUserSuccessAction
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserFailedAction;
