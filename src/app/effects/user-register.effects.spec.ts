import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {EffectsRunner, EffectsTestingModule} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import {UserRepositoryService} from '../services/user-repository.service';
import {UserRegisterEffects} from './user-register.effects';
import {
  RegisterUserAction,
  RegisterUserFailedAction,
  RegisterUserSuccessAction
} from '../actions/user-register.actions';
import {UserRegister} from '../models/user-register.model';
import {User} from '../models/user.model';
import {LoginUserAction} from '../actions/user-login.actions';

describe('UserRegisterEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      UserRegisterEffects,
      {
        provide: UserRepositoryService,
        useValue: jasmine.createSpyObj('UserRepositoryService', ['save', 'getByUsername'])
      }
    ]
  }));

  function setup(params: { saveReturnValue?: any, getByUserNameReturnValue?: any }) {
    const userRepositoryService = TestBed.get(UserRepositoryService);
    if (params) {
      if (params.getByUserNameReturnValue) {
        userRepositoryService.getByUsername.and.returnValue(params.getByUserNameReturnValue);
      }

      if (params.saveReturnValue) {
        userRepositoryService.save.and.returnValue(params.saveReturnValue);
      }
    }

    return {
      runner: TestBed.get(EffectsRunner),
      userRegisterEffects: TestBed.get(UserRegisterEffects)
    };
  }

  describe('registerNewUser$', () => {

    it('Should return RegisterUserSuccessAction, with new user data', fakeAsync(() => {
      const regUser = {username: 'test', password: 'tesT1222@', confirmPassword: 'tesT1222@'};
      const storedUser = Object.assign({}, regUser, {id: 1});
      const {runner, userRegisterEffects} = setup({
        getByUserNameReturnValue: Observable.of(null),
        saveReturnValue: Observable.of(storedUser)
      });

      runner.queue(new RegisterUserAction(regUser));

      const expectedResult = new RegisterUserSuccessAction(storedUser);
      let result = null;
      userRegisterEffects.registerNewUser$.subscribe((_result: RegisterUserSuccessAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));

    it('Should return RegisterUserFailedAction, when username already exists', fakeAsync(() => {
      const regUser: UserRegister = {username: 'test', password: 'tesT1222@', confirmPassword: 'tesT1222@'};
      const storedUser = Object.assign({}, regUser, {id: 1});
      const {runner, userRegisterEffects} = setup({
        getByUserNameReturnValue: Observable.of({id: 1}),
        saveReturnValue: Observable.of(storedUser)
      });

      runner.queue(new RegisterUserAction(regUser));

      const expectedResult = new RegisterUserFailedAction('Username is already used!');
      let result = null;
      userRegisterEffects.registerNewUser$.subscribe((_result: RegisterUserSuccessAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }))
  });

  describe('registerUserSuccess', () => {
    it('Should return LoginUserAction with user data', fakeAsync(() => {
      const user: User = {username: 't1', password: 'p1'};
      const {runner, userRegisterEffects} = setup({});

      runner.queue(new RegisterUserSuccessAction(user));

      const expectedResult = new LoginUserAction(user);
      let result = null;
      userRegisterEffects.registerUserSuccess$.subscribe((_result: LoginUserAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);

    }))
  })
});
