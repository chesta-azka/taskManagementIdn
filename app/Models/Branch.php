<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // ✅ Benar


class Branch extends Model
{
        use HasFactory;

    // Field yang boleh diisi via mass assignment
    protected $fillable = [
        'name',
        'location',
        'color',
    ];

    // (Opsional) Jika kamu pakai timestamps (created_at, updated_at), biarkan ini
    public $timestamps = true;

public function boards()
{
    return $this->hasMany(Board::class);
}
}
