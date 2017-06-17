import {async, TestBed} from '@angular/core/testing';
import {Component, NgModule} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  @Component({
    template: ''
  })
  class MockComponent {
  }

  @NgModule({
    declarations: [MockComponent],
    exports: [MockComponent]
  })
  class MockModule {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule,
        RouterTestingModule.withRoutes([
          {path: '', component: MockComponent}
        ])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
