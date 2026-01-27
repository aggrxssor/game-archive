<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

class ProfileController extends Controller
{
    public function show(string $username)
    {
        $user = User::where('name', $username)->firstOrFail();

        return response()->json([
            'username' => $user->name,
            'joined'   => $user->created_at?->toISOString(),
            'isAdmin'  => (bool) $user->is_admin,
        ]);
    }
}
