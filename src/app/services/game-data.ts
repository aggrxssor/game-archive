import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game-model';
import { MOCK_GAMES } from '../data/mock-data';

@Injectable({
  providedIn: 'root',
})
export class GameData {

  //ideiglenes backend

  private readonly games: Game[] = MOCK_GAMES;

  getAll(): Observable<Game[]> {
    return of(this.games);
  }

  getById(id: string): Observable<Game | undefined> {
    return of(this.games.find(g => g.id === id));
  }
}
