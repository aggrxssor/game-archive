<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LeaderboardController;
use App\Http\Controllers\Api\ScoreController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\Api\ProfilePreferenceController;

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/profiles/{username}', [ProfileController::class, 'show']);

// Public leaderboard
Route::get('/leaderboard', [LeaderboardController::class, 'index']);
Route::get('/leaderboard/{gameId}', [LeaderboardController::class, 'index']);


// prof stats
Route::get('/stats/{username}', [StatsController::class, 'show']);

// prof pref
Route::get('/profile/{username}', [ProfilePreferenceController::class, 'show']);


// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // score
    Route::post('/scores', [ScoreController::class, 'store']);

    // admin-only score deletion
    Route::delete('/scores/{id}', [ScoreController::class, 'destroy'])
        ->middleware('admin');

    Route::put('/profile', [ProfilePreferenceController::class, 'update']);
});
