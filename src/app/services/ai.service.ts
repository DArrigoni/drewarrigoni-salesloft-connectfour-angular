import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AiService {

  constructor(private http: Http) { }

  random(game_state, active_player) {
    return this.http.put('http://localhost:3000/random/', { game_state: game_state, active_player: active_player}).toPromise().then(response => response.json())
  }

}
