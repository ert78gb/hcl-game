import {Routes} from '@angular/router';

import {RegisterUserComponent} from './components/register-user-component/register-user.component';
import {LoginUserComponent} from './components/login-user-component/login-user.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {GamePageComponent} from './pages/game-page/game-page.component';
import {CanActivatePlay} from './guards/CanActivePlay';

export const routes: Routes = [
  {path: '', redirectTo: 'play-game', pathMatch: 'full'},

  {path: 'login', component: LoginUserComponent},
  {path: 'register', component: RegisterUserComponent},

  {path: 'play-game', component: GamePageComponent, canActivate: [CanActivatePlay]},

  {path: '**', component: PageNotFoundComponent}
];
