import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { UserStatsService } from '../../services/user-stats';
import { ScoreDecoder } from '../../services/score-codec';

interface LeaderboardEntry {
  username: string;
  score: number;
}

@Component({
  selector: 'app-scoreboard',
  standalone: false,
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.css',
})
export class Scoreboard implements OnInit {

  scores: LeaderboardEntry[] = [];

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


  private rebuildLeaderboard(): void {
    this.scores = this.stats
      .getAll()
      .flatMap(u =>
        u.scores.map(s => ({username: u.username,score: s.score,}))).sort((a, b) => b.score - a.score).slice(0, 25);
  }
}
