import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GameScore {
  scoreId: string;
  gameId: string;
  score: number;
  date: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserStatsService {

  private static readonly API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getLeaderboard(gameId: string): Observable<GameScore[]> {
    return this.http.get<GameScore[]>(
      `${UserStatsService.API}/leaderboard/${gameId}`
    );
  }

  getStats(username: string) {
  return this.http.get<{
    gamesPlayed: number;
    bestScore: number | null;
    recentScores: { gameId: string; score: number }[];
  }>(`http://127.0.0.1:8000/api/stats/${username}`);
}

  submitScore(gameId: string, score: number) {
    return this.http.post(
      'http://127.0.0.1:8000/api/scores',
      { gameId, score }
    );
  }

  deleteScore(scoreId: string): Observable<any> {
    return this.http.delete(
      `${UserStatsService.API}/scores/${scoreId}`
    );
  }
}
