<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permit extends Model
{
    protected $table = 'permit';

    public function roles(){
        return $this->hasMany(Role::class, 'id', 'role_id')->get();
    }

    public function modules(){
        return $this->hasMany(Module::class, 'id', 'module_id')->get();
    }
}
