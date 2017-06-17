import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-bs-input',
  templateUrl: './bs-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsInputComponent {

  @Input() type = 'text';
  @Input() group: FormGroup;
  @Input() id: string;
  @Input() label = '';
  @Input() controlName: string;
  @Input() errors: any = {};

  constructor() {
  }

  showErrors() {
    const control = this.getControl();
    /* istanbul ignore if  */
    if (!control) {
      return false;
    }

    return !control.valid && (control.dirty || control.touched)
  }

  errorTexts() {
    const texts: string[] = [];
    if (!this.errors || !this.showErrors()) {
      return texts;
    }

    const control = this.getControl();
    /* istanbul ignore if  */
    if (!control || !control.errors) {
      return texts;
    }

    for (const key in control.errors) {
      /* istanbul ignore if  */
      if (!(key in this.errors)) {
        continue;
      }

      texts.push(this.errors[key]);
    }

    return texts;
  }

  private getControl() {
    return this.group.controls[this.controlName];
  }
}
