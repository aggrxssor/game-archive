<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    public function show(string $username)
    {
        $user = User::where('name', $username)->firstOrFail();

        $scores = $user->scores()
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'gamesPlayed' => $scores->count(),
            'bestScore' => $scores->max('score'),
            'recentScores' => $scores
                ->take(10)
                ->map(fn ($s) => [
                    'gameId' => $s->game_id,
                    'score' => $s->score,
                ])
                ->values(),
        ]);
    }
}
