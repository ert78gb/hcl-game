import {Injectable} from '@angular/core';
import {v1} from 'uuid';

import {Game} from '../models/game.model';
import {environment} from '../../environments/environment';

@Injectable()
export class NewGameGeneratorService {

  private static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getNewGame(): Game {
    const rangeMinValue = NewGameGeneratorService.getRandomInt(environment.game.rangeMinValue, environment.game.rangeMaxValue * 0.8);
    const rangeMaxValue = NewGameGeneratorService.getRandomInt(rangeMinValue, environment.game.rangeMaxValue);
    const theNumber = NewGameGeneratorService.getRandomInt(rangeMinValue, rangeMaxValue);

    const game = {
      id: v1(),
      rangeMinValue,
      rangeMaxValue,
      theNumber,
      tips: <number[]>[]
    };

    // Just easily test success case, if the tester don't use any redux dev tool
    console.log('game: ', game);
    return game;
  }
}
