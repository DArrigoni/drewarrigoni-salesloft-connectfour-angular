import { TestBed, async } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let fixture;
  let gameBoardComponent;
  let gameBoardView;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    gameBoardComponent = fixture.debugElement.componentInstance;
  });

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

    it('should not stomp on the top disc of another player', ()=> {
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

      expect(gameBoardComponent.gameState[0][5]).toEqual(GameBoardComponent.PLAYER2);
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
        gameBoardComponent.play(0);

        gameBoardComponent.play(0);
        fixture.detectChanges;

      });
    });
  });
});
