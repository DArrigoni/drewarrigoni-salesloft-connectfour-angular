import { Component } from '@angular/core';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  static readonly PLAYER1 = 1;
  static readonly PLAYER2 = 2;

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

  play(column) {
    let openIndex = this.gameState[column].indexOf(0);
    this.gameState[column][openIndex] = this.activePlayer;
  }
}
