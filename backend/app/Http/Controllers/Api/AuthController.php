<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private function shapeUser(User $user): array
    {
        return [
            'username' => $user->name,
            'email'    => $user->email,
            'isAdmin'  => (bool) $user->is_admin,
            'joined'   => $user->created_at?->toISOString(),
        ];
    }
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'user'  => $this->shapeUser($user),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Hibás email vagy jelszó'],
            ]);
        }

        // régi tokenek törlése (opcionális, de tiszta)
        $user->tokens()->delete();

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'user'  => $this->shapeUser($user),
            'token' => $token,
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($this->shapeUser($request->user()));
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
