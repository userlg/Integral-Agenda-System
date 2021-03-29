<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'role_user';
    public $timestamps = false;

    public function permit(){
        return $this->hasMany(Permit::class, 'role_id')->get();
    }
}
