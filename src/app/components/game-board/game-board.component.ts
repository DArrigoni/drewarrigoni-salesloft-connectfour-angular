import { Component } from '@angular/core';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  static readonly PLAYER1 = 1;
  static readonly PLAYER2 = 2;

  gameState: Number[][];
  activePlayer: Number;
  won: Boolean;
  error: String;

  minWinLength: Number;
  width: Number;
  height: Number;

  //TODO: Make the width/length configurable
  //IDEA: Refactor all this state into its own object? Thin components?
  constructor() {
    this.reset()

    this.minWinLength = 4;
    this.width = this.gameState.length;
    this.height = this.gameState[0].length;
  }

  play(column) {
    if(this.won) { return; } //Still trying to play while the game is won? Silly.

    let openIndex = this.gameState[column].indexOf(0);
    if(openIndex >= 0) {
      this.error = null;

      this.gameState[column][openIndex] = this.activePlayer;

      this.won = this.checkWin();

      if(!this.won) {
        this.activePlayer = this.activePlayer == GameBoardComponent.PLAYER1 ?
          GameBoardComponent.PLAYER2 :
          GameBoardComponent.PLAYER1
      }
    } else {
      this.error = 'Cannot play disc in full column.';
    }
  }

  reset() {
    this.gameState = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ];

    this.activePlayer = GameBoardComponent.PLAYER1;
    this.won = false;
  }

  //IDEA: Extract all this win condition code into a service object? Thin components?
  private checkWin() {
    let playerWinString = Array(this.minWinLength).fill(this.activePlayer).join('');

    let reversedGameState = this.gameState.slice().reverse();

    let columnStrings = this.generateColumnStrings(this.gameState);
    let rowStrings = this.generateRowStrings(this.gameState);
    let ltrDiagonalStrings = this.generateDiagonalStrings(this.gameState);
    let rtlDiagonalStrings = this.generateDiagonalStrings(reversedGameState)

    let possibleWinStrings = columnStrings
      .concat(rowStrings)
      .concat(ltrDiagonalStrings)
      .concat(rtlDiagonalStrings);

    if(this.checkForWinString(possibleWinStrings)) { return true; }
  }

  private checkForWinString(checkStrings) {
    let playerWinString = Array(4).fill(this.activePlayer).join('');

    return checkStrings.some((checkString)=> {
      return checkString.indexOf(playerWinString) >= 0
    });
  }

  private generateColumnStrings(gameState) {
    return gameState.map((column)=> {
      return column.join('');
    })
  }

  private generateRowStrings(gameState) {
    let rowStrings = [];
    for( let rowIndex = 0; rowIndex < this.height; rowIndex++ ) {
      let rowString = gameState.map((column)=> { return column[rowIndex]; }).join('');

      rowStrings.push(rowString);
    }
    return rowStrings;
  }

  private generateDiagonalStrings(gameState) {
    let diagonalStringsByIndexSum = {};

    gameState.forEach((column, columnIndex)=> {
      column.forEach((cellValue, rowIndex)=> {
        let cell = String(cellValue);
        let indexSum = columnIndex + rowIndex;
        let currentValue = diagonalStringsByIndexSum[indexSum]

        if(currentValue) {
          diagonalStringsByIndexSum[indexSum] = currentValue.concat(cell);
        } else {
          diagonalStringsByIndexSum[indexSum] = cell;
        }
      })
    });

    let diagonalStrings = [];
    for( let key in diagonalStringsByIndexSum ) {
      diagonalStrings.push(diagonalStringsByIndexSum[key]);
    }

    return diagonalStrings;
  }
}
