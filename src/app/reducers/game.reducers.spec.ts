import {
  getCurrentGame,
  getMessage,
  initialState,
  reducer,
  showGameOver,
  showPlay,
  showWelcome,
  showWin,
  State
} from './game.reducers';
import {ReadyGameAction, StartNewGameAction, TipAction} from '../actions/game.actions';
import {Game} from '../models/game.model';

describe('GameReducer', () => {
  const testGame: Game = {
    id: 'id',
    rangeMinValue: 0,
    rangeMaxValue: 100,
    theNumber: 50,
    tips: []
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);
      expect(result).toEqual(initialState);
    });
  });

  describe('START_NEW_GAME', () => {
    it('should return the default state', () => {
      const action = new StartNewGameAction();

      const result = reducer(undefined, action);
      expect(result).toEqual(initialState);
    })
  });

  describe('READY', () => {
    it('should return with ready = true and game data', () => {
      const action = new ReadyGameAction(testGame);

      const result = reducer(undefined, action);
      expect(result).toEqual(Object.assign({}, initialState, {ready: true, game: testGame}));
    })
  });

  describe('TIP', () => {
    it('should contain tip value and degrease remainingTries', () => {
      const tip = 45;
      const action = new TipAction(tip);
      const initState = Object.assign({}, initialState, {ready: true, game: Object.assign({}, testGame)});
      const expectedState = {ready: true, game: testGame, remainingTries: 2, userTip: tip};
      expectedState.game.tips = [tip];

      const result = reducer(initState, action);
      expect(result).toEqual(Object.assign({}, initialState, expectedState));
    })
  });

  describe('Selections', () => {
    const state: State = {
      game: {
        id: 'id',
        rangeMinValue: 20,
        rangeMaxValue: 100,
        theNumber: 50,
        tips: <number[]>[]
      },
      ready: false,
      remainingTries: 3
    };

    it('getCurrentGame', () => {
      const expected = {
        id: 'id',
        rangeMinValue: 20,
        rangeMaxValue: 100,
        theNumber: 50,
        tips: <number[]>[]
      };

      expect(getCurrentGame(state)).toEqual(expected)
    });

    describe('showWelcome', () => {
      it('should return true if game is not ready', () => {
        expect(showWelcome(state)).toEqual(true)
      });

      it('should return false if game is ready', () => {
        state.ready = true;
        expect(showWelcome(state)).toEqual(false)
      })
    });

    it('showPlay', () => {
      expect(showPlay(state)).toEqual(true)
    });

    it('showWin', () => {
      state.userTip = state.game.theNumber;
      expect(showWin(state)).toEqual(true)
    });

    it('showGameOver', () => {
      state.remainingTries = 0;
      expect(showGameOver(state)).toEqual(true)
    });

    describe('getMessage', () => {
      it('no value if the remainingTries = 3 ', () => {
        state.remainingTries = 3;
        expect(getMessage(state)).toBeFalsy()
      });

      it('no value if the remainingTries = 2 ', () => {
        state.remainingTries = 2;
        expect(getMessage(state)).toEqual('Remaining tries: 2')
      })
    })
  });
});
