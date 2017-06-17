import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {Game} from '../../models/game.model';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOverComponent {

  @Input() game: Game;
  @Output() newGame = new EventEmitter();

}
