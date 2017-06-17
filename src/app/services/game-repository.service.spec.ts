import {inject, TestBed} from '@angular/core/testing';

import {Game} from '../models/game.model';
import {GameRepositoryService} from './game-repository.service';

describe('Service: GameRepositoryService', () => {
  const testGame: Game = {
    id: 'id',
    rangeMinValue: 0,
    rangeMaxValue: 100,
    theNumber: 50,
    tips: [10, 20, 30]
  };

  beforeAll(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameRepositoryService
      ]
    });
  });

  it('should be created', inject([GameRepositoryService], (gameRepository: GameRepositoryService) => {
    expect(gameRepository).toBeTruthy();
  }));

  it('Should be save game in the localStorage ', inject([GameRepositoryService], (gameRepository: GameRepositoryService) => {
    expect(localStorage.length).toEqual(0);
    gameRepository.save(testGame)
      .subscribe((game: Game) => {
        expect(game).toEqual(testGame);
        expect(localStorage.length).toEqual(1);
      })
  }));

});
