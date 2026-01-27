<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Score;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    // POST /api/scores  (auth:sanctum)
    public function store(Request $request)
    {
        $data = $request->validate([
            'gameId' => ['required', 'string', 'max:50'],
            'score'  => ['required', 'integer', 'min:0'],
        ]);

        $user = $request->user();

        // dupe prot (admin kivetellel)
        if (!$user->is_admin) {
            $lastScore = Score::where('user_id', $user->id)
                ->where('game_id', $data['gameId'])
                ->latest()
                ->first();

            if ($lastScore && $lastScore->score == $data['score']) {
                return response()->json([
                    'message' => 'Duplicate score'
                ], 422);
            }
        }

        $score = Score::create([
            'user_id' => $user->id,
            'game_id' => $data['gameId'],
            'score'   => (int) $data['score'],
        ]);

        return response()->json([
            'scoreId' => (string) $score->id,
            'gameId'  => $score->game_id,
            'score'   => (int) $score->score,
            'date'    => $score->created_at->toISOString(),
        ], 201);
    }

    // DELETE /api/scores/{id}  (auth:sanctum + admin)
    public function destroy(Request $request, int $id)
    {
        $score = Score::findOrFail($id);
        $score->delete();

        return response()->json(['message' => 'Deleted'], 204);
    }
}
