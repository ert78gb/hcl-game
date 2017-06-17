import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {RegisterUserComponent} from './register-user-component/register-user.component';
import {LoginUserComponent} from './login-user-component/login-user.component';
import {PlayGameComponent} from './game-play/game-play.component';
import {WinGameComponent} from './game-win/game-win.component';
import {GameOverComponent} from './game-over/game-over.component';
import {BsInputComponent} from './bs-input/bs-input.component';
import {AlertComponent} from './alert/alert.component';
import {SuccessComponent} from './success/success.component';
import {GameWelcomeComponent} from './game-welcome/game-welcome.component';

export const COMPONENTS = [
  BsInputComponent,
  RegisterUserComponent,
  LoginUserComponent,
  PlayGameComponent,
  WinGameComponent,
  GameOverComponent,
  AlertComponent,
  SuccessComponent,
  GameWelcomeComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}
