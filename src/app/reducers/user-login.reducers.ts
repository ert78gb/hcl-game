import {Actions, ActionTypes, LoginUserFailedAction, LoginUserSuccessAction} from '../actions/user-login.actions';
import {User} from '../models/user.model';

export interface State {
  error?: string;
  processing: boolean;
  user: User
}

export const initialState: State = {
  error: null,
  processing: false,
  user: null
};

export function reducer(state = initialState, action: Actions) {

  switch (action.type) {
    case ActionTypes.LOGIN_USER: {
      return Object.assign({}, initialState, {processing: true});
    }

    case ActionTypes.AUTO_LOGIN_USER_SUCCESS:
    case ActionTypes.LOGIN_USER_SUCCESS: {
      return Object.assign({}, state, initialState, {user: (<LoginUserSuccessAction>action).payload});
    }

    case ActionTypes.LOGIN_USER_FAILED: {
      return Object.assign({}, initialState, {error: (<LoginUserFailedAction>action).payload});
    }

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getCurrentUser = (state: State) => state.user;
