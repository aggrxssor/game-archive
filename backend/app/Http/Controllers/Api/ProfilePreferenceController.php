<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ProfilePreference;
use Illuminate\Http\Request;

class ProfilePreferenceController extends Controller
{
    // GET /api/profile/{username}
    public function show(string $username)
    {
        $user = User::where('name', $username)->firstOrFail();

        $prefs = $user->profilePreference;

        if (!$prefs) {
            return response()->json([
                'username' => $user->name,
                'avatar' => null,
                'background' => null,
                'bio' => null,
                'is_private' => false,
            ]);
        }

        return response()->json([
            'username' => $user->name,
            'avatar' => $prefs->avatar,
            'background' => $prefs->background,
            'bio' => $prefs->bio,
            'is_private' => $prefs->is_private,
        ]);
    }

    // PUT /api/profile auth:sanctum
    public function update(Request $request)
    {
        $data = $request->validate([
            'avatar' => ['nullable', 'string', 'max:100'],
            'background' => ['nullable', 'string', 'max:100'],
            'bio' => ['nullable', 'string', 'max:500'],
            'is_private' => ['required', 'boolean'],
        ]);

        $user = $request->user();

        $prefs = ProfilePreference::firstOrNew([
            'user_id' => $user->id,
        ]);

        $prefs->avatar = $data['avatar'];
        $prefs->background = $data['background'];
        $prefs->bio = $data['bio'];
        $prefs->is_private = $data['is_private'];

        $prefs->save();

        return response()->json(['message' => 'Profile updated']);
    }
}
