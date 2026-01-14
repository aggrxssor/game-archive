import { Injectable } from '@angular/core';

export interface DecodedScore {
  gameId: string;
  score: number;
}

@Injectable({ providedIn: 'root' })
export class ScoreDecoder {

  decode(encoded: string): DecodedScore | null {
    try {
      const json = atob(encoded);
      const data = JSON.parse(json);

      if (typeof data.gameId !== 'string') return null;
      if (typeof data.score !== 'number') return null;
      if (!Number.isFinite(data.score) || data.score < 0) return null;

      return {
        gameId: data.gameId,
        score: data.score,
      };
    } catch {
      return null;
    }
  }
}
