import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { GameStatusComponent } from './game-status.component';

describe('GameStatusComponent', () => {
  let component: GameStatusComponent;
  let fixture: ComponentFixture<GameStatusComponent>;
  let debugElement: DebugElement;

  let findByCss = (selector)=> { return debugElement.query(By.css(selector)) }
  let findAllByCss = (selector)=> { return debugElement.queryAll(By.css(selector)) }

  let expectCssToBePresent = (selector)=> { expect(findByCss(selector)).toBeTruthy(); }
  let expectCssToBeMissing = (selector)=> { expect(findByCss(selector)).toBeNull(); }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStatusComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameStatusComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
  }));


  it('should show the active-player status if neither won nor draw', ()=> {
    component.won = false;
    component.draw = false;

    fixture.detectChanges();

    expectCssToBePresent('#cf-game-status-active-player');
    expectCssToBeMissing('#cf-game-status-win');
    expectCssToBeMissing('#cf-game-status-draw');
  });

  it('should show the win if the status is win', ()=> {
    component.won = true;
    component.draw = false;

    fixture.detectChanges();

    expectCssToBeMissing('#cf-game-status-active-player');
    expectCssToBePresent('#cf-game-status-win');
    expectCssToBeMissing('#cf-game-status-draw');
  });

  it('should show the draw if the status is draw', ()=> {
    component.won = false;
    component.draw = true;

    fixture.detectChanges();

    expectCssToBeMissing('#cf-game-status-active-player');
    expectCssToBeMissing('#cf-game-status-win');
    expectCssToBePresent('#cf-game-status-draw');

  });
});
