import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store/';
import {ReactiveFormsModule} from '@angular/forms';
import {go} from '@ngrx/router-store';

import {LoginUserComponent} from './login-user.component';
import {reducer, State} from '../../reducers/user-login.reducers';
import {BsInputComponent} from '../bs-input/bs-input.component';
import {AlertComponent} from '../alert/alert.component';
import {LoginUserAction} from '../../actions/user-login.actions';

describe('LoginUserComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;
  let storeDispatchSpy: any;
  let store: Store<State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.provideStore({login: reducer}),
      ],
      declarations: [
        AlertComponent,
        BsInputComponent,
        LoginUserComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch navigate to register page event', fakeAsync(() => {
    component.register();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(go('register'));
  }));

  it('should dispatch LoginUserAction', fakeAsync(() => {
    const user = {
      username: 'user1',
      password: 'p1'
    };
    component.form.setValue(user);
    component.onSubmit();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(new LoginUserAction(user));
  }));

});
