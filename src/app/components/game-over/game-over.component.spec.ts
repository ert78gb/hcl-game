import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameOverComponent} from './game-over.component';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameOverComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverComponent);
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
