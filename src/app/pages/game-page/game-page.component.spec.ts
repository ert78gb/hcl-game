import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {ReactiveFormsModule} from '@angular/forms';

import {GamePageComponent} from './game-page.component';
import {reducer, State} from '../../reducers/game.reducers';
import {StartNewGameAction, TipAction} from '../../actions/game.actions';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;
  let storeDispatchSpy: any;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.provideStore({game: reducer}),
      ],
      declarations: [GamePageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.get(Store);
    storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch StartNewGameAction', fakeAsync(() => {
    component.startNewGame();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(new StartNewGameAction());
  }));

  it('should dispatch TipAction', fakeAsync(() => {
    const tip = 111;
    component.tip(tip);
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(new TipAction(tip));
  }));

});
