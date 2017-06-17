import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {SimpleChange} from '@angular/core';

import {PlayGameComponent} from './game-play.component';
import {BsInputComponent} from '../bs-input/bs-input.component';
import {AlertComponent} from '../alert/alert.component';

describe('PlayGameComponent', () => {
  let component: PlayGameComponent;
  let fixture: ComponentFixture<PlayGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        AlertComponent,
        BsInputComponent,
        PlayGameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGameComponent);
    component = fixture.componentInstance;
    component.game = {
      id: 'id',
      theNumber: 1,
      rangeMaxValue: 100,
      rangeMinValue: 0,
      tips: []
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be submit a new tip', fakeAsync(() => {
    const tipControl = component.form.controls['tip'];
    const tip = 112;
    tipControl.setValue(tip);
    let emitedValue: number;
    component.tip.subscribe((value: number) => emitedValue = value);
    component.onSubmit();
    tick();
    expect(emitedValue).toEqual(tip)
  }));

  it('should change validation when game changes', fakeAsync(() => {
    const tipControl = component.form.controls['tip'];

    component.game = {
      id: 'id',
      theNumber: 1,
      rangeMaxValue: 100,
      rangeMinValue: 0,
      tips: []
    };
    component.ngOnChanges({game: new SimpleChange({}, {}, false)});

    tipControl.setValue(110);
    const expectedMsg = `Your tip should between ${component.game.rangeMinValue} and ${component.game.rangeMaxValue}`;
    expect(component.errors.tip.range).toEqual(expectedMsg);
    expect(tipControl.errors['range']).toBeTruthy();
    tipControl.setValue(50);
    expect(tipControl.errors).toBeFalsy();
  }))
});
