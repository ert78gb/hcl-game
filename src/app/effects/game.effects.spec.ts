import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {EffectsRunner, EffectsTestingModule} from '@ngrx/effects/testing';
import {StoreModule} from '@ngrx/store';

import 'rxjs/add/observable/of';

import {GameEffects} from './game.effects';
import {GameRepositoryService} from '../services/game-repository.service';
import {Game} from '../models/game.model';
import {ReadyGameAction, StartNewGameAction, TipAction, TipSaveSuccessAction} from '../actions/game.actions';
import {reducer} from '../reducers/index';
import {NewGameGeneratorService} from '../services/new-game-generator.service';

describe('GameEffects', () => {
  const testGame: Game = {
    id: 'id',
    rangeMinValue: 0,
    rangeMaxValue: 100,
    theNumber: 50,
    tips: []
  };

  beforeEach(() => {
    return TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule,
        StoreModule.provideStore(reducer)
      ],
      providers: [
        GameEffects,
        GameRepositoryService,
        {
          provide: NewGameGeneratorService,
          useValue: jasmine.createSpyObj('NewGameGeneratorService', ['getNewGame'])
        }
      ]
    })
  });

  function setup(params: { saveReturnValue?: any, newGameReturnValue?: Game }) {
    const gameRepositoryService = TestBed.get(GameRepositoryService);
    const newGameGeneratorService = TestBed.get(NewGameGeneratorService);

    if (params) {
      if (params.saveReturnValue) {
        gameRepositoryService.save.and.returnValue(params.saveReturnValue);
      }

      if (params.newGameReturnValue) {
        newGameGeneratorService.getNewGame.and.returnValue(params.newGameReturnValue)
      }
    }

    return {
      runner: TestBed.get(EffectsRunner),
      gameEffects: TestBed.get(GameEffects)
    };
  }

  describe('startGame$', () => {
    it('Should return ReadyGameAction', fakeAsync(() => {
      const gameRepositoryService = TestBed.get(GameRepositoryService);
      spyOn(gameRepositoryService, 'save').and.callThrough();
      const {runner, gameEffects} = setup({
        newGameReturnValue: testGame
      });
      runner.queue(new StartNewGameAction());

      const expectedResult = new ReadyGameAction(testGame);
      let result = null;
      gameEffects.startGame$.subscribe((_result: ReadyGameAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
      expect(gameRepositoryService.save).toHaveBeenCalledWith(testGame);
    }));
  });

  describe('tip$', () => {
    it('Should return ReadyGameAction', fakeAsync(() => {
      const gameRepositoryService = TestBed.get(GameRepositoryService);
      spyOn(gameRepositoryService, 'save').and.callThrough();
      const {runner, gameEffects} = setup({
        newGameReturnValue: testGame
      });
      runner.queue(new TipAction(110));

      const expectedResult = new TipSaveSuccessAction();
      let result = null;
      gameEffects.tip$.subscribe((_result: ReadyGameAction) => result = _result);
      tick();
      expect(result).toEqual(expectedResult);
      // The EffectRunner not maintaine the store
      // expect(gameRepositoryService.save).toHaveBeenCalledWith(testGame);
    }));
  })

});
