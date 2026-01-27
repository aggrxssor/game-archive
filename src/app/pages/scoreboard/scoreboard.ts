import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { UserStatsService, GameScore } from '../../services/user-stats';
import { ScoreDecoder } from '../../services/score-codec';
import { Router } from '@angular/router';


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
  submitError: string | null = null;

  lastDeleted: GameScore | null = null;
  pendingDelete: LeaderboardEntry | null = null

  undoTimeoutId: any = null;

  constructor(
    public auth: Auth,
    private stats: UserStatsService,
    private decoder: ScoreDecoder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.stats.getLeaderboard('space-shooter').subscribe(items => {
      this.scores = items.map(i => ({
        username: i.username,
        score: i.score,
        scoreId: i.scoreId
      }));
    });
  }

  submitEncodedScore(input: HTMLInputElement): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
      return;
    }

    this.submitError = null;

    const raw = input.value.trim();
    if (!raw) return;

    const decoded = this.decoder.decode(raw);
    if (!decoded) {
      this.submitError = 'Invalid score code.';
      return;
    }

    this.stats.submitScore(decoded.gameId, decoded.score).subscribe({
      next: () => {
        input.value = '';
        this.loadLeaderboard();
      },
      error: err => {
        if (err.status === 422 && err.error?.message) {
          this.submitError = err.error.message;
        } else {
          this.submitError = 'Failed to submit score.';
        }
      }
    });
  }


  onDeleteClick(entry: LeaderboardEntry): void {
    this.pendingDelete = entry;
  }

  confirmDelete(): void {
    if (!this.pendingDelete) return;

    this.stats.deleteScore(this.pendingDelete.scoreId).subscribe(() => {
      this.lastDeleted = {
        username: this.pendingDelete!.username,
        score: this.pendingDelete!.score,
        scoreId: this.pendingDelete!.scoreId,
        gameId: 'space-shooter',
        date: new Date().toISOString()
      };

      this.pendingDelete = null;
      this.loadLeaderboard();

      if (this.undoTimeoutId) {
        clearTimeout(this.undoTimeoutId);
      }

      this.undoTimeoutId = setTimeout(() => {
        this.lastDeleted = null;
      }, 10000);
    });
  }

  cancelDelete(): void {
    this.pendingDelete = null;
  }

  undoDelete(): void {
    if (!this.lastDeleted) return;

    this.stats.submitScore(this.lastDeleted.gameId, this.lastDeleted.score)
      .subscribe(() => {
        this.lastDeleted = null;
        this.loadLeaderboard();
      });
  }
}
