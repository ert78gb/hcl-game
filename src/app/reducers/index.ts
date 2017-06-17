import {createSelector} from 'reselect';
import {compose} from '@ngrx/core/compose';
import {ActionReducer, combineReducers} from '@ngrx/store';
import {routerReducer, RouterState} from '@ngrx/router-store';
import {storeFreeze} from 'ngrx-store-freeze';

import {environment} from '../../environments/environment';
import * as fromUserRegister from './user-register.reducers';
import * as fromUserLogin from './user-login.reducers';
import * as fromGame from './game.reducers';

export interface State {
  router: RouterState;
  register: fromUserRegister.State;
  login: fromUserLogin.State;
  game: fromGame.State
}

const reducers = {
  router: routerReducer,
  register: fromUserRegister.reducer,
  login: fromUserLogin.reducer,
  game: fromGame.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);
/* istanbul ignore next */
export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const registerState = (state: State) => state.register;
export const getRegisterError = createSelector(registerState, fromUserRegister.getError);

export const loginState = (state: State) => state.login;
export const getLoginError = createSelector(loginState, fromUserLogin.getError);
export const getCurrentUser = createSelector(loginState, fromUserLogin.getCurrentUser);

export const gameState = (state: State) => state.game;
export const getCurrentGame = createSelector(gameState, fromGame.getCurrentGame);
export const getShowWelcome = createSelector(gameState, fromGame.showWelcome);
export const getShowPlay = createSelector(gameState, fromGame.showPlay);
export const getShowWin = createSelector(gameState, fromGame.showWin);
export const getShowGameOver = createSelector(gameState, fromGame.showGameOver);
export const getMessage = createSelector(gameState, fromGame.getMessage);
