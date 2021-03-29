<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Utility\Connection;
use App\Http\Controllers\ConnectionController;
use App\Role;
use Auth;
use App\User;
use App\Module;
use App\Permit;


class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function create_role(Request $request){
        $role = new Role;
        $role->role = $request->name;
        $role->save();
        return response()->json(['status'=>200 ,'Message'=>'role saved!']);
    }

    public function list_role(Request $request){
        $roles = DB::select('select * from role_user');

        return response()->json($roles);
    }

    public function role_id(Request $request){
        $roles = DB::select('SELECT `id`, `role` FROM `role_user` WHERE `id` = :id',['id' => $request->id]);

        return response()->json($roles);
    }

    public function role_permit(Request $request){
        $role_permit = DB::select('SELECT `id`, `value`, `role_id`, `module_id` FROM `permit` WHERE `role_id`= :role_id',['role_id' => $request->role_id]);
        return response()->json($role_permit);
    }
    public function role_by_module_permit(Request $request){
    return response()->json(Auth::user()->role()->permit()->where('module_id','=',$request->id)->values());
    }
    /*public function menuDinamic(){

        $data=collect();

        foreach (Auth::user()->role()->permit() as $module) {
            if(!$data->contains('title', Module::find($module->modules()[0]->id_parent)->module)){
               $data->push([
                   'action'=> 'zmdi-home',
                   'id_parent'=>Module::find($module->modules()[0]->id_parent)->id,
                   'title'=>Module::find($module->modules()[0]->id_parent)->module,
                   'active'=>false,
                   'items'=>[],
               ]);
            }
        }
           $data = $data->map( function ($item, $key) {
               foreach (Auth::user()->role()->permit() as $module) {
                   if(Module::find($module->module_id)->id_parent == $item['id_parent'])
                   array_push($item['items'], [
                       'title'=> Module::find($module->module_id)->module,
                       'path'=> Module::find($module->module_id)->url
                      ]);
           }
               return $item;
               });

               return response()->json($data);
    } */
    public function menuDinamic(){
        $data=collect();

         foreach (Permit::where([['value', 2],['role_id', Auth::user()->role_id]])->get() as $module) {
             if(!$data->contains('title', Module::find($module->modules()[0]->id_parent)->module)){
                $data->push([
                    'action'=> Module::find($module->modules()[0]->id_parent)->icon,
                    'id_parent'=>Module::find($module->modules()[0]->id_parent)->id,
                    'title'=>Module::find($module->modules()[0]->id_parent)->module,
                    'active'=>false,
                    'items'=>collect(),
                ]);
             }
         }
            $data = $data->map( function ($item, $key) {
                foreach (Permit::where([['value', 2],['role_id', Auth::user()->role_id]])->get()as $module) {
                    if(Module::find($module->module_id)->id_parent == $item['id_parent'])
                    $item['items']->push( [
                        'title'=> Module::find($module->module_id)->module,
                        'path'=> Module::find($module->module_id)->url
                       ]);
                   /* array_push($item['items'], [
                        'title'=> Module::find($module->module_id)->module,
                        'path'=> Module::find($module->module_id)->url
                       ])*/
            }
                return $item;
                });
                $data = $data->map( function ($item, $key) {
                    $unique = $item['items']->unique();
                    $item['items']=$unique;
                     return $item;
                    });
        return  response()->json($data);
    }

    public function rolePermitUser(){
        $data=collect();
         foreach (Auth::user()->role()->permit() as $module) {
             if(!$data->contains('title', Module::find($module->modules()[0]->id_parent)->module)){
                $data->push([
                    'action'=> Module::find($module->modules()[0]->id_parent)->icon,
                    'id_parent'=>Module::find($module->modules()[0]->id_parent)->id,
                    'title'=>Module::find($module->modules()[0]->id_parent)->module,
                    'active'=>false,
                    'items'=>collect(),
                ]);
             }
         }
            $data = $data->map( function ($item, $key) {
                foreach (Auth::user()->role()->permit() as $module) {
                    if(Module::find($module->module_id)->id_parent == $item['id_parent'])
                    $item['items']->push( [
                        'title'=> Module::find($module->module_id)->module,
                        'path'=> Module::find($module->module_id)->url
                       ]);
                   /* array_push($item['items'], [
                        'title'=> Module::find($module->module_id)->module,
                        'path'=> Module::find($module->module_id)->url
                       ])*/
            }
                return $item;
                });

                $data = $data->map( function ($item, $key) {
                    $unique = $item['items']->unique();
                    $item['items']=$unique;
                    return  $item;
                    });
        return  response()->json($data);
    }

    public function delete_role(Request $request){
        $role = DB::delete('DELETE FROM `role_user` WHERE `id` = :id',['id' => $request->id]);

        return response()->json($role);
    }
    public function permitValidate(Request $request){

        //return response()->json(Auth::user());
        $flag = false;
        foreach (Auth::user()->role()->permit() as $module) {

            if(strpos($request->url, Module::find($module->module_id)->url))
            return response()->json("ok");
        }
        if ($request->url == '/scm/dashboard/home')
        return response()->json("ok");
        if ($request->url == '/scm/pages/blank')
        return response()->json("ok");
        if ($request->url == '/scm/pages/blank1')
        return response()->json("ok");

        return response()->json("redirect", '/scm/pages/blank');

    }
}
