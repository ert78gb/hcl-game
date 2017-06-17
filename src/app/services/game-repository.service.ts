import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {EntityTypes} from './db-store-entities';
import {Game} from '../models/game.model';

@Injectable()
export class GameRepositoryService {
  private static getGames() {
    return JSON.parse(localStorage.getItem(EntityTypes.GAMES) || JSON.stringify({}));
  }

  constructor() {
  }

  save(game: Game): Observable<Game> {
    return new Observable((observer: Subscriber<Game>) => {
      const games = GameRepositoryService.getGames();

      games[game.id] = game;
      localStorage.setItem(EntityTypes.GAMES, JSON.stringify(games));
      observer.next(game);
      observer.complete();
    })
  }
}
