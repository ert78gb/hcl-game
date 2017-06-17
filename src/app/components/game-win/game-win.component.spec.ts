import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinGameComponent } from './game-win.component';

describe('WinGameComponent', () => {
  let component: WinGameComponent;
  let fixture: ComponentFixture<WinGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinGameComponent);
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
});
