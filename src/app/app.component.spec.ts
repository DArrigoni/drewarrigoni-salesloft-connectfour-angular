import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameStatusComponent } from './components/game-status/game-status.component';
import { AiService } from './services/ai.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, GameBoardComponent, GameStatusComponent ],
      providers: [ { provide: AiService, useValue: null } ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
