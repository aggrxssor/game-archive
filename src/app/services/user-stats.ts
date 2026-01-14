import { Injectable } from '@angular/core';

export interface GameScore {
  gameId: string;
  score: number;
  date: string;
}

export interface UserStats {
  username: string;
  gamesPlayed: number;
  scores: GameScore[];
}

@Injectable({
  providedIn: 'root',
})
export class UserStatsService {

  private static readonly STORAGE_KEY = 'user_stats';
  private stats: UserStats[] = [];

  constructor() {
    const raw = localStorage.getItem(UserStatsService.STORAGE_KEY);
    this.stats = raw ? JSON.parse(raw) : [];
  }

  private persist(): void {
    localStorage.setItem(
      UserStatsService.STORAGE_KEY,
      JSON.stringify(this.stats)
    );
  }

  get(username: string): UserStats {
    let user = this.stats.find(u => u.username === username);

    if (!user) {
      user = {
        username,
        gamesPlayed: 0,
        scores: [],
      };
      this.stats.push(user);
      this.persist();
    }

    return user;
  }

  addScore(username: string, gameId: string, score: number): void {
    const user = this.get(username);

    user.gamesPlayed++;
    user.scores.push({
      gameId,
      score,
      date: new Date().toISOString(),
    });

    this.persist();
  }

  getAll(): UserStats[] {
    return [...this.stats];
  }
}
