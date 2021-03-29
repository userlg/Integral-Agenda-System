<?php

use Illuminate\Database\Seeder;


use App\Module;

use Illuminate\Support\Facades\DB;
class ModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //TOOLS
        Module::insert(['module'=>'tools','id_child'=>0,'icon'=>'zmdi-wrench']);
        Module::insert([
        ['module'=>'register', 'id_child'=>0, 'id_parent'=>1, 'icon'=>'zmdi-wrench', 'url'=>'/tools/sign-up'],
        ['module'=>'listusers', 'id_child'=>0, 'id_parent'=>1, 'icon'=>'zmdi-wrench', 'url'=>'/tools/list_users'],
        ['module'=>'createrole', 'id_child'=>0, 'id_parent'=>1, 'icon'=>'zmdi-wrench','url'=>'/tools/create_role'],
        ['module'=>'listroles', 'id_child'=>0, 'id_parent'=>1, 'icon'=>'zmdi-wrench', 'url'=>'/tools/list_roles'],
        ['module'=>'edituser', 'id_child'=>0, 'id_parent'=>1, 'icon'=>'zmdi-wrench','url'=>'/tools/edit_user'],
        ['module'=>'editrole', 'id_child'=>0, 'id_parent'=>1, 'icon'=>'zmdi-wrench', 'url'=>'/tools/edit_role']
        ]);
        
        Module::insert(['module'=>'modules','id_child'=>0,'icon'=>'zmdi-wrench']);
        Module::insert([
        ['module'=>'scheduler', 'id_child'=>0, 'id_parent'=>8, 'icon'=>'zmdi-wrench', 'url'=>'/module/scheduler'],
        ['module'=>'chat', 'id_child'=>0, 'id_parent'=>8, 'icon'=>'zmdi-wrench', 'url'=>'/module/chat'],
        ['module'=>'inbox', 'id_child'=>0, 'id_parent'=>8, 'icon'=>'zmdi-wrench', 'url'=>'/module/inbox'],
        ]);
    }
}
