import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.css']
})
export class GameStatusComponent {
  @Input('active-player') activePlayer: Number;
  @Input('won') won: Boolean;

  @Output() resetEvent: EventEmitter<String> = new EventEmitter<String>()

  reset() {
    this.resetEvent.emit('reset');
  }
}
