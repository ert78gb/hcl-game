import { User } from '../../src/app/models/user.model';
import { Game } from '../../src/app/models/game.model';

export function clearLocalStore() {
  return window.localStorage.clear();
}

export function saveUserInLocalStore(user: User) {
  return window.localStorage.setItem('logged_user', JSON.stringify(user));
}

export function saveTestUserInLocalStore(user: User) {
  const dictionary: { [id: string]: User } = {};
  dictionary[user.username] = user;
  return window.localStorage.setItem('users', JSON.stringify(dictionary));
}

export function getGameFromLocalStore(): Game {
  const games = JSON.parse(window.localStorage.getItem('games'));
  const keys = Object.keys(games);
  return games[keys[0]];
}
