<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Utility\Connection;
use App\Http\Controllers\ConnectionController;
use App\Role;



class PermitController extends Controller
{
    public function save_permit(Request $request){
        $permits = $request;
        //return dd($permits);
        //$permits = json_encode($permits);
        //return dd($permits);
        //return dd($permits);
        DB::table('permit')->where('role_id','=',$permits["id_role"] )->delete();
        for ($i=0; $i < sizeof($permits["permit_aux"]); $i++) {
            DB::table('permit')->insert(
                ["value"=>$permits["permit_aux"][$i]["value"],
                "role_id"=>$permits["id_role"],
                "module_id"=>$permits["permit_aux"][$i]["module_id"],
                "created_at"=>Carbon::now(),
                "updated_at"=>Carbon::now()]
            );
            if(($permits["permit_aux"][$i]["value"] == 3 || $permits["permit_aux"][$i]["value"] == 4) && ($permits["permit_aux"][$i]["module_id"] == 5 || $permits["permit_aux"][$i]["module_id"] == 3) )
            {
                DB::table('permit')->insert(
                ["value"=>$permits["permit_aux"][$i]["value"],
                "role_id"=>$permits["id_role"],
                "module_id"=>$permits["permit_aux"][$i]["module_id"] == 5 ? 7:6,
                "created_at"=>Carbon::now(),
                "updated_at"=>Carbon::now()]
            );
            }

        }
        return response()->json(['status'=>'OK','Message'=>'Permits saved!']);
    }

    public function get_permit(Request $request){
        $role['role_id'] = $request->role_id;
        $role['role'] = DB::table('role_user')->select('role')->where('id','=',$role['role_id'])->get()[0]->role;
        $response=["role"=>$role["role"],
        "role_id"=>$role["role_id"],
        "modules"=>$this->get_modules()["modules"]];

        $permits = DB::table('permit')->select('value','module_id')
                                    ->where('role_id','=',$role['role_id'])
                                    ->get();

        for ($i=0; $i < sizeof($response["modules"]) ; $i++) {
            for ($j=0; $j < sizeof($response["modules"][$i]["child"]) ; $j++) {
                for ($k=0; $k < sizeof($permits) ; $k++) {
                    if($permits[$k]->module_id == $response["modules"][$i]["child"][$j]["id"]){
                        array_push($response["modules"][$i]["child"][$j]["permits"],$permits[$k]->value);
                    }
                }
            }
        }
        return response()->json(['status'=>'OK',"response"=>$response]);
    }
    public function get_modules(){
        $parent_array = array();
        $child_array = array();
        $parent_id = NULL;
        $modules = DB::table("modules")->select('id','module','id_parent')->get();
        $response = ["modules"=> []];
        for ($i=0; $i < sizeof($modules) ; $i++) {
            if($modules[$i]->id_parent <> NULL){
                array_push($child_array,$modules[$i]);
            }else{
                array_push($parent_array,$modules[$i]);
            }
        }
        for ($i=0; $i < sizeof($parent_array) ; $i++) {
            $response["modules"][$i] = ["id_parent"=>$parent_array[$i]->id,
                                        "parent"=>$parent_array[$i]->module,
                                        "child"=>array()];
            for ($j=0; $j < sizeof($child_array) ; $j++) {
                if($parent_array[$i]->id == $child_array[$j]->id_parent){
                    array_push($response["modules"][$i]["child"],["id"=>$child_array[$j]->id,
                                                                    "name"=>$child_array[$j]->module,
                                                                    "permits"=>array()]);
                }
            }
        }
        return $response;
    }
}
