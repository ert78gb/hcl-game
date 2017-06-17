import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterStoreModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {ComponentsModule} from './components/components.module';
import {routes} from './routes';
import {UserRegisterEffects} from './effects/user-register.effects';
import {reducer} from './reducers/index';
import {UserRepositoryService} from './services/user-repository.service';
import {UserLoginEffects} from './effects/user-login.effects';
import {GameRepositoryService} from './services/game-repository.service';
import {GameEffects} from './effects/game.effects';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {GamePageComponent} from './pages/game-page/game-page.component';
import {CanActivatePlay} from './guards/CanActivePlay';
import {NewGameGeneratorService} from './services/new-game-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GamePageComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(UserRegisterEffects),
    EffectsModule.run(UserLoginEffects),
    EffectsModule.run(GameEffects)
  ],
  providers: [
    UserRepositoryService,
    GameRepositoryService,
    NewGameGeneratorService,
    CanActivatePlay
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
