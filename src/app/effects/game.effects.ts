import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';

import {ActionTypes, ReadyGameAction, TipSaveSuccessAction} from '../actions/game.actions';
import {GameRepositoryService} from '../services/game-repository.service';
import {getCurrentGame, State} from '../reducers/index';
import {NewGameGeneratorService} from '../services/new-game-generator.service';

@Injectable()
export class GameEffects {

  @Effect() startGame$: Observable<Action> = this.actions$
    .ofType(ActionTypes.START_NEW_GAME)
    .switchMap(() => {
      const game = this.newGameService.getNewGame();
      return this.gameService.save(game)
    })
    .switchMap((game) => Observable.of(new ReadyGameAction(game)))
  ;

  @Effect() tip$: Observable<Action> = this.actions$
    .ofType(ActionTypes.TIP)
    .withLatestFrom(this.store.select(getCurrentGame))
    .switchMap(([action, game]) => {
      return this.gameService.save(game)
        .switchMap(() => {
          return Observable.of(new TipSaveSuccessAction())
        })
    })
  ;

  constructor(private actions$: Actions,
              private store: Store<State>,
              private gameService: GameRepositoryService,
              private newGameService: NewGameGeneratorService) {
  }
}
