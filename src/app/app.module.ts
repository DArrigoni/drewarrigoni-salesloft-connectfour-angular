import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameStatusComponent } from './components/game-status/game-status.component';
import { AiService } from './services/ai.service';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameStatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
