import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {Game} from '../../models/game.model';

@Component({
  selector: 'app-play-game',
  templateUrl: './game-play.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayGameComponent implements OnChanges {

  form: FormGroup;
  errors = {
    tip: {
      required: 'Tip is required',
      range: ''
    }
  };

  @Input() message: string;
  @Input() game: Game;
  @Output() tip = new EventEmitter<number>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tip: new FormControl('', [Validators.required])
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['game']) {
      const tipControl = this.form.controls['tip'];
      tipControl.setValidators([Validators.required, CustomValidators.range([this.game.rangeMinValue, this.game.rangeMaxValue])]);
      this.errors.tip.range = `Your tip should between ${this.game.rangeMinValue} and ${this.game.rangeMaxValue}`;
    }
  }

  onSubmit() {
    this.tip.emit(Number.parseInt(this.form.value.tip));
  }
}
