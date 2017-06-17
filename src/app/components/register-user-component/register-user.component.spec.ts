import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store/';
import {ReactiveFormsModule} from '@angular/forms';

import {RegisterUserComponent} from './register-user.component';
import {reducer, State} from '../../reducers/user-register.reducers';
import {RegisterUserAction} from '../../actions/user-register.actions';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let storeDispatchSpy: any;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.provideStore({register: reducer}),
      ],
      declarations: [RegisterUserComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();

  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch LoginUserAction', fakeAsync(() => {
    const user = {
      username: 'user1',
      password: 'p1',
      confirmPassword: 'p1'
    };
    component.form.setValue(user);
    component.onSubmit();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(new RegisterUserAction(user));
  }));
});
