import {inject, TestBed} from '@angular/core/testing';

import {UserRepositoryService} from './user-repository.service';
import {User} from '../models/user.model';

describe('Service: UserRepositoryService', () => {
  const testUser: User = {
    username: 't1',
    password: 'p1'
  };

  beforeAll(() => {
    localStorage.clear();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRepositoryService
      ]
    });
  });

  it('should be created', inject([UserRepositoryService], (userRepository: UserRepositoryService) => {
    expect(userRepository).toBeTruthy();
  }));

  it('Should be save user in the localStorage ', inject([UserRepositoryService], (userRepository: UserRepositoryService) => {
    expect(localStorage.length).toEqual(0);
    userRepository.save(testUser)
      .subscribe((user: User) => {
        expect(user).toEqual(testUser);
        expect(localStorage.length).toEqual(1);
      })
  }));

  it('Should return with user if it exists in localStore', inject([UserRepositoryService], (userRepository: UserRepositoryService) => {
    expect(localStorage.length).toEqual(1);
    userRepository.getByUsername(testUser.username)
      .subscribe((user: User) => {
        expect(user).toEqual(testUser);
        expect(localStorage.length).toEqual(1);
      })
  }));

  it('Should return with null if it not exists in localStore', inject([UserRepositoryService], (userRepository: UserRepositoryService) => {
    expect(localStorage.length).toEqual(1);
    userRepository.getByUsername('else')
      .subscribe((user: User) => {
        expect(user).not.toBeTruthy();
        expect(localStorage.length).toEqual(1);
      })
  }))
});
