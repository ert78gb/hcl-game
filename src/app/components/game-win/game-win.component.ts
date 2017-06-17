import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {Game} from '../../models/game.model';

@Component({
  selector: 'app-win-game',
  templateUrl: './game-win.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinGameComponent {

  @Input() game: Game;
  @Output() newGame = new EventEmitter();

}
