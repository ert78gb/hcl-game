import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {BsInputComponent} from './bs-input.component';

describe('BsInputComponent', () => {
  let component: BsInputComponent;
  let fixture: ComponentFixture<BsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [BsInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsInputComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    component.group = new FormGroup({
      field: new FormControl('')
    });
    component.controlName = 'field';
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('showErrors()', () => {

    it('should be return true if control is invalid', async(() => {
      component.group = new FormGroup({
        field: new FormControl('', [Validators.required])
      });
      const field = component.group.controls['field'];
      component.controlName = 'field';
      expect(component.showErrors()).toBeFalsy();
      field.markAsDirty();
      field.setValue(null);
      expect(component.showErrors()).toBeTruthy();
    }));

    it('should be return false if control is valid', async(() => {
      component.group = new FormGroup({
        field: new FormControl('', [Validators.required])
      });
      const field = component.group.controls['field'];
      component.controlName = 'field';
      expect(component.showErrors()).toBeFalsy();
      field.markAsDirty();
      field.setValue(11);
      expect(component.showErrors()).toBeFalsy();
    }));
  });

  describe('errorTexts()', () => {
    it('should return with text', () => {

      component.errors = {
        required: 'Must fill'
      }
      ;

      component.group = new FormGroup({
        field: new FormControl('', [Validators.required])
      });
      const field = component.group.controls['field'];
      component.controlName = 'field';
      field.markAsDirty();
      field.setValue(null);

      const errorTexts = component.errorTexts();
      expect(errorTexts).toBeTruthy();
      expect(errorTexts.length).toEqual(1);
      expect(errorTexts[0]).toEqual('Must fill');
    })

  })

});
