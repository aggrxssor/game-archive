<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilePreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'avatar',
        'background',
        'bio',
        'is_private',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
