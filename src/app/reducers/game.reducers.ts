import {Actions, ActionTypes, ReadyGameAction, TipAction} from '../actions/game.actions';

import {Game} from '../models/game.model';

export interface State {
  game: Game,
  userTip?: number;
  ready: boolean,
  remainingTries: number
}

export const initialState: State = {
    game: {
      id: '',
      rangeMinValue: 0,
      rangeMaxValue: 0,
      theNumber: 0,
      tips: []
    },
    ready: false,
    remainingTries: 3
  }
;

export function reducer(state = initialState, action: Actions) {

  switch (action.type) {
    case ActionTypes.START_NEW_GAME: {
      return Object.assign({}, initialState);
    }

    case ActionTypes.READY: {
      return Object.assign({}, state, initialState, {
        game: (<ReadyGameAction>action).payload,
        ready: true
      });
    }

    case ActionTypes.TIP: {
      const userTip = (<TipAction>action).payload;
      const newState = Object.assign({}, state, {userTip});
      newState.game = Object.assign({}, state.game);
      newState.game.tips = state.game.tips.concat(userTip);
      newState.remainingTries--;
      return newState;
    }

    default:
      return state;
  }
}

export const getCurrentGame = (state: State) => state.game;
export const showWelcome = (state: State) => !state.ready;
export const showPlay = (state: State) => state.ready && state.remainingTries > 0 && state.game.theNumber !== state.userTip;
export const showWin = (state: State) => state.game.theNumber === state.userTip;
export const showGameOver = (state: State) => state.remainingTries <= 0;
export const getMessage = (state: State) => state.remainingTries === 3 ? null : `Remaining tries: ${state.remainingTries}`;
