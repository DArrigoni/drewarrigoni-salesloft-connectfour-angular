import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { GameStatusComponent } from '../game-status/game-status.component';
import { AiService } from '../../services/ai.service';

describe('GameBoardComponent', () => {
  let fixture: ComponentFixture<GameBoardComponent>;
  let gameBoardComponent: GameBoardComponent;

  const aiResponseColumn = 2;

  const stubAiService = {
    random: (gameState, activePlayer) => {
      return Promise.resolve(aiResponseColumn)
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        GameStatusComponent
      ],
      providers: [
        { provide: AiService, useValue: stubAiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    gameBoardComponent = fixture.debugElement.componentInstance;
  }));

  //IDEA: Get these magic 7 columns and 6 row numbers out to build generic game boards

  describe('Initializations', () => {
    it('should be initialized with empty game-state', () => {
      // 7 columns of 6. Think of the board as being on its side.
      expect(gameBoardComponent.gameState).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]);
    });

    it('should detect the height of the game board', ()=> {
      expect(gameBoardComponent.height).toEqual(6);
    });

    it('should detect the width of the game board', ()=> {
      expect(gameBoardComponent.width).toEqual(7);
    });

    it('should be initialized with the default active player', () => {
      expect(gameBoardComponent.activePlayer).toEqual(GameBoardComponent.PLAYER1);
    });

    it('should not be won to begin with', ()=> {
      expect(gameBoardComponent.won).toEqual(false);
    })
  });

  describe('.play', () => {
    it('should fill in the bottom row for the column', () => {
      gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;

      gameBoardComponent.play(3);

      expect(gameBoardComponent.gameState[3][0]).toEqual(GameBoardComponent.PLAYER1);
    });

    it('should stack a disc on top of another if present', ()=> {
      gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
      gameBoardComponent.gameState[0][0] = GameBoardComponent.PLAYER1;

      gameBoardComponent.play(0);

      expect(gameBoardComponent.gameState[0][1]).toEqual(GameBoardComponent.PLAYER1);
    });

    it('should stack a disc on top of another player disc if present', ()=> {
      gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
      gameBoardComponent.gameState[0][0] = GameBoardComponent.PLAYER2;

      gameBoardComponent.play(0);

      expect(gameBoardComponent.gameState[0][1]).toEqual(GameBoardComponent.PLAYER1);
    });

    it('should switch to the next player when played', ()=> {
      gameBoardComponent.play(0);

      expect(gameBoardComponent.activePlayer).toEqual(GameBoardComponent.PLAYER2);

      gameBoardComponent.play(0);

      expect(gameBoardComponent.activePlayer).toEqual(GameBoardComponent.PLAYER1);
    });

    it('should clear any pre-existing error message', ()=> {
      gameBoardComponent.error = 'Bad stuff!';

      gameBoardComponent.play(0);

      expect(gameBoardComponent.error).toBeNull();
    })

    describe('Invalid move', ()=> {
      beforeEach(()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2],
          [2, 2, 2, 2, 2, 2]
        ]

        gameBoardComponent.play(0);
      });

      it('should not stomp on the top disc of another player', ()=> {
        expect(gameBoardComponent.gameState[0][5]).toEqual(GameBoardComponent.PLAYER2);
      });

      it('should not change the player if you try to play on a column that is full', ()=> {
        expect(gameBoardComponent.activePlayer).toEqual(GameBoardComponent.PLAYER1);
      });

      it('should set an error message', ()=> {
        expect(gameBoardComponent.error).toEqual('Cannot play disc in full column.');
      });
    });

    describe('win conditions', ()=> {
      it('should flag a game as won if 4 are connected vertically', ()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [1, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0]
        ]

        gameBoardComponent.play(0);

        expect(gameBoardComponent.won).toBeTruthy();
      });

      it('should flag a game as won if 4 are connected horizontally', ()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0]
        ]

        gameBoardComponent.play(0);

        expect(gameBoardComponent.won).toBeTruthy();
      });

      it('should flag a game as won if 4 are connected left-to-right diagonally', ()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [2, 2, 2, 0, 0, 0],
          [2, 2, 1, 0, 0, 0],
          [2, 1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0]
        ]

        gameBoardComponent.play(0);

        expect(gameBoardComponent.won).toBeTruthy();
      });

      it('should flag a game as won if 4 are connected right-to-left diagonally', ()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0],
          [2, 1, 0, 0, 0, 0],
          [2, 2, 1, 0, 0, 0],
          [2, 2, 2, 0, 0, 0]
        ]

        gameBoardComponent.play(6);

        expect(gameBoardComponent.won).toBeTruthy();

      });

      it('should not continue playing once the game is won', ()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [1, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0]
        ]
        //Win
        gameBoardComponent.play(0);

        //Extra
        gameBoardComponent.play(0);

        expect(gameBoardComponent.gameState[0][4]).toEqual(0);
      });

      it('should not switch players once the game is won', ()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [1, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0]
        ]
        gameBoardComponent.play(0);

        expect(gameBoardComponent.activePlayer).toEqual(GameBoardComponent.PLAYER1);

      });
    });

    describe('draw conditions', ()=> {
      it('should be a draw if you fill every space', ()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [1, 2, 1, 2, 1, 0],
          [1, 2, 1, 2, 1, 2],
          [2, 1, 2, 1, 2, 1],
          [2, 1, 2, 1, 2, 1],
          [1, 2, 1, 2, 1, 2],
          [1, 2, 1, 2, 1, 2],
          [2, 1, 2, 1, 2, 1]
        ]
        gameBoardComponent.play(0);

        expect(gameBoardComponent.draw).toEqual(true);
      });

      it('should not be a draw if every spot is filled but there is a winner', ()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [1, 2, 1, 1, 1, 0],
          [1, 2, 2, 2, 1, 2],
          [2, 1, 2, 1, 2, 1],
          [2, 1, 2, 1, 2, 1],
          [1, 2, 1, 2, 1, 2],
          [1, 2, 1, 2, 1, 2],
          [2, 1, 2, 1, 2, 1]
        ]
        gameBoardComponent.play(0);

        expect(gameBoardComponent.won).toEqual(true);
        expect(gameBoardComponent.draw).toEqual(false);
      });

      it('should not continue playing once the game is drawn', ()=> {
        gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;
        gameBoardComponent.gameState = [
          [1, 2, 1, 2, 1, 0],
          [1, 2, 1, 2, 1, 2],
          [2, 1, 2, 1, 2, 1],
          [2, 1, 2, 1, 2, 1],
          [1, 2, 1, 2, 1, 2],
          [1, 2, 1, 2, 1, 2],
          [2, 1, 2, 1, 2, 1]
        ]
        //Draw
        gameBoardComponent.play(0);

        //Extra
        gameBoardComponent.play(0);

        expect(gameBoardComponent.error).toBeNull();
      });

    });
  });

  describe('.reset()', ()=> {
    it('should reset the game state', ()=> {
      gameBoardComponent.gameState = [
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]

      gameBoardComponent.reset();

      expect(gameBoardComponent.gameState).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ])
    });

    it('should reset the active player', ()=> {
      gameBoardComponent.activePlayer = GameBoardComponent.PLAYER2;

      gameBoardComponent.reset();

      expect(gameBoardComponent.activePlayer).toEqual(GameBoardComponent.PLAYER1);
    });

    it('should reset the won state', ()=> {
      gameBoardComponent.won = true;

      gameBoardComponent.reset();

      expect(gameBoardComponent.won).toEqual(false);
    });

    it('should reset the draw state', ()=> {
      gameBoardComponent.draw = true;

      gameBoardComponent.reset();

      expect(gameBoardComponent.draw).toEqual(false);

    });
  });

  describe('.playRandom', () => {
    it('should call play with the correct value', fakeAsync(() => {
      spyOn(gameBoardComponent, 'play');

      gameBoardComponent.playRandom();

      tick();

      expect(gameBoardComponent.play).toHaveBeenCalledWith(aiResponseColumn);
    }));
  });
});
