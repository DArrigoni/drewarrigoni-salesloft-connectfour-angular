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

    it('should be initialized with the default active player', () => {
      expect(gameBoardComponent.activePlayer).toEqual(GameBoardComponent.PLAYER1);
    });
  });

  //TODO: Refactor these into game-board.component.html.spec.ts to separate the concerns

  describe('Rendering game state', () => {
    beforeEach(() => {
      gameBoardComponent.gameState = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      fixture.detectChanges();

      gameBoardView = fixture.debugElement.nativeElement;
    });


    it('should render 7 columns', () => {
      expect(gameBoardView.querySelectorAll('.cf-column').length).toEqual(7);
    });

    it('should properly assign ids to each column', () => {
      for (let columnIndex = 1; columnIndex <= 7; columnIndex++) {
        const rowId = `#cf-column${columnIndex}`;
        expect(gameBoardView.querySelector(rowId)).toBeTruthy();
      }
    });

    it('should render 6 rows per column', () => {
      for (let columnIndex = 1; columnIndex <= 7; columnIndex++) {
        const columnElem = gameBoardView.querySelector(`#cf-column${columnIndex}`);

        expect(columnElem.querySelectorAll('.cf-cell').length).toEqual(6);
      }
    });

    it('should properly assign ids to each cell', () => {
      for (let columnIndex = 1; columnIndex <= 7; columnIndex++) {
        for (let rowIndex = 1; rowIndex <= 6; rowIndex++) {
          const cellId = `#cf-column${columnIndex}-row${rowIndex}`;
          expect(gameBoardView.querySelector(cellId)).toBeTruthy();
        }
      }
    });

    it('should properly assign player data for blank spots', () => {
      //Player "0' spot (aka blank)
      const selector = '#cf-column1-row1.cf-player0';
      const elem = gameBoardView.querySelector(selector);

      expect(elem).toBeTruthy();
      expect(Number(elem.getAttribute('data-player'))).toEqual(0);
    });

    it('should properly assign player data for player 1', () => {
        //Player 1 spot
      const selector = '#cf-column4-row1.cf-player1';
      const elem = gameBoardView.querySelector(selector);

      expect(elem).toBeTruthy();
      expect(Number(elem.getAttribute('data-player'))).toEqual(1);
    });

    it('should properly assign player data for player 2', () => {
      //Player 2 spot
      const selector = '#cf-column3-row1.cf-player2';
      const elem = gameBoardView.querySelector(selector);

      expect(elem).toBeTruthy();
      expect(Number(elem.getAttribute('data-player'))).toEqual(2);
    });
  });

  describe('.play', () => {
    it('should fill in the bottom row for the column', () => {
      gameBoardComponent.activePlayer = GameBoardComponent.PLAYER1;

      gameBoardComponent.play(3);
      fixture.detectChanges();

      expect(gameBoardComponent.gameState[3][0]).toEqual(GameBoardComponent.PLAYER1);
    });

    // TODO: Refactor this into game-board.component.html.spec.ts

    describe('Click binding', () => {
      it('should fill in the bottom row for the column clicked', () => {
        gameBoardView.querySelector('#cf-column4').click();
        fixture.detectChanges();

        const selector = '#cf-column4-row1.cf-player1';
        const elem = gameBoardView.querySelector(selector);

        expect(elem).toBeTruthy();
      });
    });
  });
});