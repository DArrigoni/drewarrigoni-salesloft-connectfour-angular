import { Component } from '@angular/core';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  static readonly PLAYER1 = 1;
  static readonly PLAYER2 = 2;

  //TODO: Make the width/length configurable
  gameState = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  activePlayer = GameBoardComponent.PLAYER1;
  won = false;

  play(column) {
    //if(won) { return; } //Still trying to play while the game is won? Silly.

    let openIndex = this.gameState[column].indexOf(0);
    this.gameState[column][openIndex] = this.activePlayer;

    //Could make these magic numbers but this is just as clear
    let width = this.gameState.length;
    let height = this.gameState[0].length;
    //
    //TODO: Make this a configurable number
    let minWinLength = 4;

    let playerWinString = Array(minWinLength).fill(this.activePlayer).join('');
    console.log(playerWinString);

    //Column check
    for( let column of this.gameState ) {
      let columnString = column.join('');
      if(columnString.indexOf(playerWinString) >= 0) {
        this.won = true;
        break;
      }
    }

    //Row check
    for( let rowIndex = 0; rowIndex < height; rowIndex++ ) {
      let rowString = '';
      for ( let column of this.gameState ) {
        rowString = rowString.concat(String(column[rowIndex]));
      }

      if(rowString.indexOf(playerWinString) >= 0) {
        this.won = true;
        break;
      }
    }

    //Left to right diagonal check - AKA sum the indexes and key by the sum
    let ltrDiagonalStrings = {};

    //Generate diagonal strings
    this.gameState.forEach((column, columnIndex)=> {
      column.forEach((cellValue, rowIndex)=> {
        let cell = String(cellValue);
        let indexSum = columnIndex + rowIndex;
        let currentValue = ltrDiagonalStrings[indexSum]
        if(currentValue) {
          ltrDiagonalStrings[indexSum] = currentValue.concat(cell);
        } else {
          ltrDiagonalStrings[indexSum] = cell;
        }
      })
    });

    //Check Diagonal strings
    for( let key in ltrDiagonalStrings ) {
      let diagonalString = ltrDiagonalStrings[key];
      console.log(diagonalString)
      if(diagonalString.indexOf(playerWinString) >= 0) {
        this.won = true;
        break;
      }
    }
    //
    //Left to right diagonal check - AKA sum the indexes and key by the sum
    let rtlDiagonalStrings = {};

    //Generate diagonal strings
    let reversedGameState = this.gameState.slice().reverse();
    reversedGameState.forEach((column, columnIndex)=> {
      column.forEach((cellValue, rowIndex)=> {
        let cell = String(cellValue);
        let indexSum = columnIndex + rowIndex;
        let currentValue = rtlDiagonalStrings[indexSum]
        if(currentValue) {
          rtlDiagonalStrings[indexSum] = currentValue.concat(cell);
        } else {
          rtlDiagonalStrings[indexSum] = cell;
        }
      })
    });

    //Check Diagonal strings
    for( let key in rtlDiagonalStrings ) {
      let diagonalString = rtlDiagonalStrings[key];
      console.log(diagonalString)
      if(diagonalString.indexOf(playerWinString) >= 0) {
        this.won = true;
        break;
      }
    }
  }
}
