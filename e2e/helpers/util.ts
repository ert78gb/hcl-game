import { User } from '../../src/app/models/user.model';

export function clearLocalStore() {
  return window.localStorage.clear();
}

export function saveUserInLocalStore(user: User) {
  return window.localStorage.setItem('logged_user', JSON.stringify(user));
}
