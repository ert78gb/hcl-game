import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {getCurrentUser, State} from '../reducers/index';

@Injectable()
export class CanActivatePlay implements CanActivate {
  constructor(private store: Store<State>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(getCurrentUser)
      .map((user) => {
        if (!user) {
          this.router.navigate(['login']);
          return false;
        }

        return true;
      })
  }
}
