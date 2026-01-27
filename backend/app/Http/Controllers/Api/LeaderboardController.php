<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Score;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    // GET /api/leaderboard/{gameId}?limit=25
    // GET /api/leaderboard?gameId=space-shooter&limit=25
    public function index(Request $request, ?string $gameId = null)
    {
        $gameId = $gameId ?? (string) $request->query('gameId', 'space-shooter');

        $limit = (int) $request->query('limit', 25);
        $limit = max(1, min($limit, 100));

        $rows = Score::query()
            ->where('game_id', $gameId)
            ->with('user:id,name')
            ->orderByDesc('score')
            ->limit($limit)
            ->get(['id', 'user_id', 'game_id', 'score', 'created_at'])
            ->map(fn ($r) => [
                'username' => $r->user?->name ?? 'Unknown',
                'score'    => (int) $r->score,
                'scoreId'  => (string) $r->id,
                'date'     => $r->created_at?->toISOString(),
                'gameId'   => $r->game_id,
            ])
            ->values();

        return response()->json($rows);
    }
}
