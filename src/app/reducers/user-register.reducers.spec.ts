import {getError, initialState, reducer} from './user-register.reducers';
import {
  RegisterUserAction,
  RegisterUserFailedAction,
  RegisterUserSuccessAction
} from '../actions/user-register.actions';
import {UserRegister} from '../models/user-register.model';

describe('UserLoginReducer', () => {
  const registerUser: UserRegister = {
    username: 't1',
    password: 'p1',
    confirmPassword: 'p1'
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(initialState);
    });
  });

  describe('REGISTER_USER', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, new RegisterUserAction(registerUser));
      expect(result).toEqual(Object.assign({}, initialState, {error: null, processing: true}));
    });
  });

  describe('REGISTER_USER_SUCCESS', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, new RegisterUserSuccessAction(registerUser));
      expect(result).toEqual(initialState);
    });
  });

  describe('REGISTER_USER_FAILED', () => {
    it('should return with the error message', () => {
      const message = 'text';
      const result = reducer(undefined, new RegisterUserFailedAction(message));
      expect(result.error).toEqual(message);
      expect(result.processing).toBeFalsy();
    });
  });

  describe('Selectors', () => {
    it('Should return with the error message', () => {
      const message = 'text';
      const result = getError({error: message, processing: true});
      expect(result).toEqual(message);
    })
  })
});
