import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameRules } from '../data/mock-rules';
import { MOCK_RULES } from '../data/mock-rules';

@Injectable({
  providedIn: 'root',
})
export class RulesData {

  private readonly rules = MOCK_RULES;

  getByGameId(id: string): Observable<GameRules | undefined> {
    return of(this.rules.find(r => r.id === id));
  }
}
