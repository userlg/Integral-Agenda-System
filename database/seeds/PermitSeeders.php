<?php

use Illuminate\Database\Seeder;
use App\Permit;
class PermitSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permit::insert([
            //ADMINISTRADOR
            ['value'=>1, 'role_id'=>1, 'module_id'=>2],
            ['value'=>2, 'role_id'=>1, 'module_id'=>2],
            ['value'=>3, 'role_id'=>1, 'module_id'=>2],
            ['value'=>4, 'role_id'=>1, 'module_id'=>2],
            ['value'=>1, 'role_id'=>1, 'module_id'=>3],
            ['value'=>2, 'role_id'=>1, 'module_id'=>3],
            ['value'=>3, 'role_id'=>1, 'module_id'=>3],
            ['value'=>4, 'role_id'=>1, 'module_id'=>3],
            ['value'=>1, 'role_id'=>1, 'module_id'=>4],
            ['value'=>2, 'role_id'=>1, 'module_id'=>4],
            ['value'=>3, 'role_id'=>1, 'module_id'=>4],
            ['value'=>4, 'role_id'=>1, 'module_id'=>4],
            ['value'=>1, 'role_id'=>1, 'module_id'=>5],
            ['value'=>2, 'role_id'=>1, 'module_id'=>5],
            ['value'=>3, 'role_id'=>1, 'module_id'=>5],
            ['value'=>4, 'role_id'=>1, 'module_id'=>5],
            ['value'=>3, 'role_id'=>1, 'module_id'=>6],
            ['value'=>3, 'role_id'=>1, 'module_id'=>7],
            ['value'=>1, 'role_id'=>1, 'module_id'=>9],
            ['value'=>2, 'role_id'=>1, 'module_id'=>9],
            ['value'=>3, 'role_id'=>1, 'module_id'=>9],
            ['value'=>4, 'role_id'=>1, 'module_id'=>9],
            ['value'=>1, 'role_id'=>1, 'module_id'=>10],
            ['value'=>2, 'role_id'=>1, 'module_id'=>10],
            ['value'=>3, 'role_id'=>1, 'module_id'=>10],
            ['value'=>4, 'role_id'=>1, 'module_id'=>10],
            ['value'=>1, 'role_id'=>1, 'module_id'=>11],
            ['value'=>2, 'role_id'=>1, 'module_id'=>11],
            ['value'=>3, 'role_id'=>1, 'module_id'=>11],
            ['value'=>4, 'role_id'=>1, 'module_id'=>11],
            //LECTOR
            ['value'=>2, 'role_id'=>3, 'module_id'=>3],
        ]);
    }
}
