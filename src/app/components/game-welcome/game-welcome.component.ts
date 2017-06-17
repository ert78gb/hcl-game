import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-game-welcome',
  templateUrl: './game-welcome.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameWelcomeComponent {

  @Output() start = new EventEmitter();

}
