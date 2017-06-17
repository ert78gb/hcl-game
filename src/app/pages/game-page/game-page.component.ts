import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {
  getCurrentGame,
  getMessage,
  getShowGameOver,
  getShowPlay,
  getShowWelcome,
  getShowWin,
  State
} from '../../reducers/index';
import {StartNewGameAction, TipAction} from '../../actions/game.actions';
import {Game} from '../../models/game.model';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePageComponent {
  game$: Observable<Game>;
  showWelcome$: Observable<boolean>;
  showPlay$: Observable<boolean>;
  showWin$: Observable<boolean>;
  showGameOver$: Observable<boolean>;
  message$: Observable<string>;

  constructor(private store: Store<State>) {
    this.game$ = store.select(getCurrentGame);
    this.showWelcome$ = store.select(getShowWelcome);
    this.showPlay$ = store.select(getShowPlay);
    this.showWin$ = store.select(getShowWin);
    this.showGameOver$ = store.select(getShowGameOver);
    this.message$ = store.select(getMessage);
  }

  startNewGame() {
    this.store.dispatch(new StartNewGameAction())
  }

  tip(value: number) {
    this.store.dispatch(new TipAction(value))
  }

}
