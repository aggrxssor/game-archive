import { Injectable } from '@angular/core';

export interface GameScore {
  scoreId: string;
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
  private static readonly SCORE_COOLDOWN_MS = 60_000;

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

  addScore(
    username: string,
    gameId: string,
    score: number
  ): { ok: true } | { ok: false; reason: 'cooldown' | 'duplicate' } {

    const user = this.get(username);
    const now = Date.now();


    const last = user.scores[user.scores.length - 1];
    if (last) {
      const lastTime = Date.parse(last.date);
      if (!Number.isNaN(lastTime)) {
        if (now - lastTime < UserStatsService.SCORE_COOLDOWN_MS) {
          return { ok: false, reason: 'cooldown' };
        }
      }
    }

    const isDuplicate = user.scores.some(
      s => s.gameId === gameId && s.score === score
    );
    if (isDuplicate) {
      return { ok: false, reason: 'duplicate' };
    }

    user.scores.push({
      scoreId: crypto.randomUUID(),
      gameId,
      score,
      date: new Date().toISOString(),
    });

    user.gamesPlayed++;
    this.persist();

    return { ok: true };
  }


  deleteScore(username: string, scoreId: string): GameScore | null {
    const user = this.stats.find(u => u.username === username);
    if (!user) return null;

    const index = user.scores.findIndex(s => s.scoreId === scoreId);
    if (index === -1) return null;

    const [removed] = user.scores.splice(index, 1);
    user.gamesPlayed = Math.max(0, user.gamesPlayed - 1);

    this.persist();
    return removed;
  }


  getAll(): UserStats[] {
    return [...this.stats];
  }
}
