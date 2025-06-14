<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{

    protected $fillable = ['name', 'branch_id'];
    
public function tasks()
{
    return $this->hasMany(Task::class)->orderBy('order'); // opsional bisa taruh default order di sini juga
}
}
