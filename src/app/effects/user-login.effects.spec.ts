import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {EffectsRunner, EffectsTestingModule} from '@ngrx/effects/testing';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {go} from '@ngrx/router-store';

import 'rxjs/add/observable/of';

import {UserRepositoryService} from '../services/user-repository.service';
import {UserLoginEffects} from './user-login.effects';
import {
  AutoLoginUserAction,
  AutoLoginUserSuccessAction,
  LoginUserAction,
  LoginUserFailedAction,
  LoginUserSuccessAction
} from '../actions/user-login.actions';

describe('UserLoginEffects', () => {
  const testUser = {
    username: 't1',
    password: 'p1'
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      UserLoginEffects,
      {
        provide: UserRepositoryService,
        useValue: jasmine.createSpyObj('UserRepositoryService', ['save', 'getByUsername'])
      }
    ]
  }));

  function setup(params: { getByUserNameReturnValue?: any }) {
    const userRepositoryService = TestBed.get(UserRepositoryService);
    if (params) {
      if (params.getByUserNameReturnValue) {
        userRepositoryService.getByUsername.and.returnValue(params.getByUserNameReturnValue);
      }
    }

    return {
      runner: TestBed.get(EffectsRunner),
      userLoginEffects: TestBed.get(UserLoginEffects)
    };
  }

  describe('autoLoginUser$', () => {

    it('Should return AutoLoginUserSuccessAction when localStorage user data is valid', fakeAsync(() => {
      localStorage.setItem('logged_user', JSON.stringify(testUser));
      const {runner, userLoginEffects} = setup({});

      runner.queue(new AutoLoginUserAction());

      const expectedResult = new AutoLoginUserSuccessAction(testUser);
      let result = null;
      userLoginEffects.autoLoginUser$.subscribe((_result: AutoLoginUserSuccessAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));

    it('Should return Observable.empty() when localStorage user data is empty', fakeAsync(() => {
      localStorage.clear();
      const {runner, userLoginEffects} = setup({});

      runner.queue(new AutoLoginUserAction());

      const expectedResult: any = null;
      let result = null;
      userLoginEffects.autoLoginUser$.subscribe((_result: any) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));

    it('Should return Observable.empty() when localStorage user data.username is not exists', fakeAsync(() => {
      localStorage.setItem('logged_user', JSON.stringify({password: 'p1'}));
      const {runner, userLoginEffects} = setup({});

      runner.queue(new AutoLoginUserAction());

      const expectedResult: any = null;
      let result = null;
      userLoginEffects.autoLoginUser$.subscribe((_result: any) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));

    it('Should return Observable.empty() when localStorage user data is not JSON object', fakeAsync(() => {
      localStorage.setItem('logged_user', 'empty');
      const {runner, userLoginEffects} = setup({});

      runner.queue(new AutoLoginUserAction());

      const expectedResult: any = null;
      let result = null;
      userLoginEffects.autoLoginUser$.subscribe((_result: any) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));

    it('Should return Observable.empty() when localStorage user data.password is not exists', fakeAsync(() => {
      localStorage.setItem('logged_user', JSON.stringify({username: 'n1'}));
      const {runner, userLoginEffects} = setup({});

      runner.queue(new AutoLoginUserAction());

      const expectedResult: any = null;
      let result = null;
      userLoginEffects.autoLoginUser$.subscribe((_result: any) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));
  });

  describe('loginUser$', () => {
    it('Should return LoginUserSuccessAction when username and password ar OK', fakeAsync(() => {
      const {runner, userLoginEffects} = setup({
        getByUserNameReturnValue: Observable.of(testUser)
      });

      runner.queue(new LoginUserAction(testUser));

      const expectedResult: LoginUserSuccessAction = new LoginUserSuccessAction(testUser);
      let result: LoginUserSuccessAction = null;
      userLoginEffects.loginUser$.subscribe((_result: LoginUserSuccessAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));

    it('Should return LoginUserFailedAction when username is not match', fakeAsync(() => {
      const {runner, userLoginEffects} = setup({
        getByUserNameReturnValue: Observable.of(testUser)
      });

      runner.queue(new LoginUserAction({username: 'not good', password: testUser.password}));

      const expectedResult: LoginUserFailedAction = new LoginUserFailedAction('Wrong username or password');
      let result: LoginUserFailedAction = null;
      userLoginEffects.loginUser$.subscribe((_result: LoginUserFailedAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));

    it('Should return LoginUserFailedAction when password is not match', fakeAsync(() => {
      const {runner, userLoginEffects} = setup({
        getByUserNameReturnValue: Observable.of(testUser)
      });

      runner.queue(new LoginUserAction({username: testUser.password, password: 'wrong'}));

      const expectedResult: LoginUserFailedAction = new LoginUserFailedAction('Wrong username or password');
      let result: LoginUserFailedAction = null;
      userLoginEffects.loginUser$.subscribe((_result: LoginUserFailedAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));

    it('Should return LoginUserFailedAction when username and password either not match', fakeAsync(() => {
      const {runner, userLoginEffects} = setup({
        getByUserNameReturnValue: Observable.of(testUser)
      });

      runner.queue(new LoginUserAction({username: 'bad', password: 'wrong'}));

      const expectedResult: LoginUserFailedAction = new LoginUserFailedAction('Wrong username or password');
      let result: LoginUserFailedAction = null;
      userLoginEffects.loginUser$.subscribe((_result: LoginUserFailedAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));

    it('Should return LoginUserFailedAction when user is not exists', fakeAsync(() => {
      const {runner, userLoginEffects} = setup({
        getByUserNameReturnValue: Observable.of(null)
      });

      runner.queue(new LoginUserAction({username: 'bad', password: 'wrong'}));

      const expectedResult: LoginUserFailedAction = new LoginUserFailedAction('Wrong username or password');
      let result: LoginUserFailedAction = null;
      userLoginEffects.loginUser$.subscribe((_result: LoginUserFailedAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
    }));
  });

  describe('loginSucces$', () => {
    it('Should save user data in local store', fakeAsync(() => {
      localStorage.clear();
      const {runner, userLoginEffects} = setup({});

      runner.queue(new LoginUserSuccessAction(testUser));

      const expectedResult: Action = go('play-game');
      let result: Action = null;
      userLoginEffects.loginSuccess$.subscribe((_result: Action) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
      expect(localStorage.length).toEqual(1);
      expect(JSON.parse(localStorage.getItem('logged_user'))).toEqual(testUser);
    }));
  });

});
