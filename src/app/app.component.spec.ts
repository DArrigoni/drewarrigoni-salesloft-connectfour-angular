import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, GameBoardComponent ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
