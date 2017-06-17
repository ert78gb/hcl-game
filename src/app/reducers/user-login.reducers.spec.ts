import {getCurrentUser, getError, initialState, reducer, State} from './user-login.reducers';
import {
  AutoLoginUserSuccessAction,
  LoginUserAction,
  LoginUserFailedAction,
  LoginUserSuccessAction
} from '../actions/user-login.actions';

describe('UserLoginReducer', () => {
  const user = {
    username: 't1',
    password: 'p1'
  };

  const state: State = {
    error: 'Error message',
    processing: false,
    user: {
      username: 'orig',
      password: 'origp'
    }
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(initialState);
    });
  });

  describe('LOGIN_USER', () => {
    it('should change processing to true', () => {
      const result = reducer(initialState, new LoginUserAction(user));
      expect(result.processing).toBeTruthy();
    })
  });

  describe('LOGIN_USER_SUCCESS', () => {
    it('should change user and processing change false', () => {
      const result = reducer(initialState, new LoginUserSuccessAction(user));
      expect(result.processing).toBeFalsy();
      expect(result.user).toEqual(user);
    })
  });

  describe('AUTO_LOGIN_USER_SUCCESS', () => {
    it('should change user and processing change false', () => {
      const result = reducer(initialState, new AutoLoginUserSuccessAction(user));
      expect(result.processing).toBeFalsy();
      expect(result.user).toEqual(user);
    })
  });

  describe('LOGIN_USER_FAILED', () => {
    it('should set error message with payload', () => {
      const message = 'text';
      const result = reducer(initialState, new LoginUserFailedAction(message));
      expect(result.processing).toBeFalsy();
      expect(result.error).toEqual(message);
    })
  });

  describe('Selectors', () => {
    it('getError should return the error message', () => {
      expect(getError(state)).toEqual(state.error);
    });

    it('getCurrentUser return with user', () => {
      expect(getCurrentUser(state)).toEqual(state.user);
    })
  });

});
