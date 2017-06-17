import {Action} from '@ngrx/store';

import {Game} from '../models/game.model';

const PREFIX = '[game] ';

export const ActionTypes = {
  START_NEW_GAME: PREFIX + 'Start new game',
  READY: PREFIX + 'Ready',
  TIP: PREFIX + 'Tip',
  TIP_SAVE_SUCCESS: PREFIX + 'Tip save sucess',
};


export class StartNewGameAction implements Action {
  readonly type = ActionTypes.START_NEW_GAME;
}

export class ReadyGameAction implements Action {
  readonly type = ActionTypes.READY;

  constructor(public payload: Game) {
  }
}

export class TipAction implements Action {
  readonly type = ActionTypes.TIP;

  constructor(public payload: number) {
  }
}

export class TipSaveSuccessAction implements Action {
  readonly type = ActionTypes.TIP_SAVE_SUCCESS;
}


export type Actions
  = StartNewGameAction
  | ReadyGameAction
  | TipAction
  | TipSaveSuccessAction;

