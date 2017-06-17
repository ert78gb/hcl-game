import {inject, TestBed} from '@angular/core/testing';

import {NewGameGeneratorService} from './new-game-generator.service';
import {environment} from '../../environments/environment';

describe('Service: NewGameGeneratorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewGameGeneratorService
      ]
    });
  });

  it('should be created', inject([NewGameGeneratorService], (newGameGenerator: NewGameGeneratorService) => {
    expect(newGameGenerator).toBeTruthy();
  }));

  it('Should be generate valid game ', inject([NewGameGeneratorService], (newGameGenerator: NewGameGeneratorService) => {
    const newGame = newGameGenerator.getNewGame();
    expect(newGame.rangeMinValue).toBeGreaterThanOrEqual(environment.game.rangeMinValue);
    expect(newGame.rangeMinValue).toBeLessThanOrEqual(environment.game.rangeMaxValue * 0.8);
    expect(newGame.rangeMaxValue).toBeGreaterThan(newGame.rangeMinValue);
    expect(newGame.rangeMaxValue).toBeLessThanOrEqual(newGame.rangeMaxValue);
  }));

});
