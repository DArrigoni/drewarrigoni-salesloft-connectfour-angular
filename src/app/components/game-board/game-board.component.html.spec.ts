import { TestBed, async } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng2-mock-component'

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent View', () => {
  let fixture;
  let debugElement;
  let gameBoardComponent;

  let MockGameStatus = MockComponent({ selector: 'game-status', inputs: ['active-player', 'won'] });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        MockGameStatus
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    fixture.autoDetectChanges();

    debugElement = fixture.debugElement;

    gameBoardComponent = debugElement.componentInstance;
  })

  let findByCss = (selector)=> { return debugElement.query(By.css(selector)) }
  let findAllByCss = (selector)=> { return debugElement.queryAll(By.css(selector)) }

  let expectCssToBePresent = (selector)=> { expect(findByCss(selector)).toBeTruthy(); }

  describe('Game Status', ()=> {
    it('should include the game status', ()=> {
      expectCssToBePresent('game-status');
    });
  });

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

    });


    it('should render 7 columns', () => {
      expect(findAllByCss('.cf-column').length).toEqual(7);
    });

    it('should properly assign ids to each column', () => {
      for (let columnIndex = 1; columnIndex <= 7; columnIndex++) {
        expectCssToBePresent(`#cf-column${columnIndex}`);
      }
    });

    it('should render 6 rows per column', () => {
      for (let columnIndex = 1; columnIndex <= 7; columnIndex++) {
        const columnElem = debugElement.query(By.css(`#cf-column${columnIndex}`));

        expect(columnElem.queryAll(By.css('.cf-cell')).length).toEqual(6);
      }
    });

    it('should properly assign ids to each cell', () => {
      for (let columnIndex = 1; columnIndex <= 7; columnIndex++) {
        for (let rowIndex = 1; rowIndex <= 6; rowIndex++) {
          const cellId = `#cf-column${columnIndex}-row${rowIndex}`;

          expectCssToBePresent(cellId)
        }
      }
    });

    it('should properly assign player data for blank spots', () => {
      //Player "0' spot (aka blank)
      const elem = findByCss('#cf-column1-row1.cf-player0');

      expect(elem).toBeTruthy();
      expect(Number(elem.attributes['data-player'])).toEqual(0);
    });

    it('should properly assign player data for player 1', () => {
      //Player 1 spot
      const elem = findByCss('#cf-column4-row1.cf-player1');

      expect(elem).toBeTruthy();
      expect(Number(elem.attributes['data-player'])).toEqual(1);
    });

    it('should properly assign player data for player 2', () => {
      //Player 2 spot
      const elem = findByCss('#cf-column3-row1.cf-player2');

      expect(elem).toBeTruthy();
      expect(Number(elem.attributes['data-player'])).toEqual(2);
    });

    it('should not render an error message', ()=> {
      const elem = findByCss('#cf-game-board-error');

      expect(elem).toBeNull();
    })

    describe('with errors', ()=> {
      it('should not render an error message', ()=> {
        gameBoardComponent.error = 'Bad stuff!';
        fixture.detectChanges();

        const elem = findByCss('#cf-game-board-error');

        expect(elem.nativeElement.textContent).toEqual('Bad stuff!');
      })
    });
  });

  describe('Click binding', () => {
    it('should fill in the bottom row for the column clicked', () => {
      debugElement.query(By.css('#cf-column4')).nativeElement.click();

      expectCssToBePresent('#cf-column4-row1.cf-player1');
    });
  });
});
