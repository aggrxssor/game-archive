<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('game_id', 50); // e.g. "space-shooter"
            $table->unsignedInteger('score');

            $table->timestamps();

            // Optional: quick leaderboard query
            $table->index(['game_id', 'score']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
