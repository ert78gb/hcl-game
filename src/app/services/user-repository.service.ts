import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {User} from '../models/user.model';
import {EntityTypes} from './db-store-entities';

@Injectable()
export class UserRepositoryService {
  private static getUsers() {
    return JSON.parse(localStorage.getItem(EntityTypes.USERS) || JSON.stringify({}));
  }

  constructor() {
  }

  save(registerUser: User): Observable<User> {
    return new Observable((observer: Subscriber<User>) => {
      const users = UserRepositoryService.getUsers();
      const user = {
        username: registerUser.username,
        password: registerUser.password
      };

      users[user.username] = user;
      localStorage.setItem(EntityTypes.USERS, JSON.stringify(users));
      observer.next(user);
      observer.complete();
    })
  }

  getByUsername(username: string): Observable<User> {
    return new Observable((observer: Subscriber<User>) => {
      const users = UserRepositoryService.getUsers();
      observer.next(users[username]);
      observer.complete();
    })
  }
}
