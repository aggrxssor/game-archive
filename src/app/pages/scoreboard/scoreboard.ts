import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { UserStatsService } from '../../services/user-stats';
import { ScoreDecoder } from '../../services/score-codec';

interface LeaderboardEntry {
  username: string;
  score: number;
  scoreId: string;
}

@Component({
  selector: 'app-scoreboard',
  standalone: false,
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.css'
})
export class Scoreboard implements OnInit {

  scores: LeaderboardEntry[] = [];

  lastDeleted: {
    username: string;
    score: number;
    scoreId: string;
    gameId: string;
    date: string;
  } | null = null;

  pendingDelete: {
    username: string;
    scoreId: string;
  } | null = null;

  undoTimeoutId: any = null;

  constructor(
    public auth: Auth,
    private stats: UserStatsService,
    private decoder: ScoreDecoder
  ) {}

  ngOnInit(): void {
    this.rebuildLeaderboard();
  }

  submitEncodedScore(input: HTMLInputElement): void {
    if (!this.auth.isLoggedIn || !this.auth.username) return;

    const decoded = this.decoder.decode(input.value.trim());
    if (!decoded) {
      return;
    }

    this.stats.addScore(
      this.auth.username,
      decoded.gameId,
      decoded.score
    );

    input.value = '';
    this.rebuildLeaderboard();
  }

  onDeleteClick(entry: LeaderboardEntry): void {
    this.pendingDelete = {
      username: entry.username,
      scoreId: entry.scoreId,
    };
  }

  confirmDelete(): void {
    if (!this.pendingDelete) return;

    const pending = this.pendingDelete; // ✅ capture first

    const removed = this.stats.deleteScore(
      pending.username,
      pending.scoreId
    );

    this.pendingDelete = null;
    if (!removed) return;

    this.lastDeleted = {
      username: pending.username,
      score: removed.score,
      scoreId: removed.scoreId,
      gameId: removed.gameId,
      date: removed.date,
    };

    this.rebuildLeaderboard();

    if (this.undoTimeoutId) {
      clearTimeout(this.undoTimeoutId);
    }

    this.undoTimeoutId = setTimeout(() => {
      this.lastDeleted = null;
    }, 10000);
  }

  cancelDelete(): void {
    this.pendingDelete = null;
  }

  undoDelete(): void {
    if (!this.lastDeleted) return;

    this.stats.addScore(
      this.lastDeleted.username,
      this.lastDeleted.gameId,
      this.lastDeleted.score
    );

    this.lastDeleted = null;
    this.rebuildLeaderboard();
  }

  private rebuildLeaderboard(): void {
    this.scores = this.stats
      .getAll()
      .flatMap(u =>
        u.scores.map(s => ({username: u.username,score: s.score, scoreId: s.scoreId}))).sort((a, b) => b.score - a.score).slice(0, 25);
  }
}
