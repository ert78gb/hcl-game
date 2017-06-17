import { Action } from '@ngrx/store';

import { type } from '../utils';
import { User } from '../models/user.model';

const PREFIX = '[user-registration] ';

export const ActionTypes = {
  REGISTER_USER: type(PREFIX + 'Register new user'),
  REGISTER_USER_SUCCESS: type(PREFIX + 'New user registration success'),
  REGISTER_USER_FAILED: type(PREFIX + 'New user registration failed')
};

export class RegisterUserAction implements Action {
  readonly type = ActionTypes.REGISTER_USER;

  constructor(public payload: User) { }
}

export class RegisterUserSuccessAction implements Action {
  readonly type = ActionTypes.REGISTER_USER_SUCCESS;

  constructor(public payload: User) { }
}

export class RegisterUserFailedAction implements Action {
  readonly type = ActionTypes.REGISTER_USER_FAILED;

  constructor(public payload: any) { }
}

export type Actions
    = RegisterUserAction
    | RegisterUserSuccessAction
    | RegisterUserFailedAction;
