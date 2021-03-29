<?php

use Illuminate\Database\Seeder;
use App\User;
class UserSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        User::insert([
                ['name'=>'admin','email'=>'admin@admin.com','role_id'=>1,'password' => bcrypt('secret')],
                ['name'=>'publico','email'=>'publico@publico.com','role_id'=>2,'password' => bcrypt('secret')],
                ['name'=>'lector','email'=>'lector@lector.com','role_id'=>3,'password' => bcrypt('secret')],
            ]);
        
    }
}
