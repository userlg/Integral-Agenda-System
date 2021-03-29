<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Utility\Connection;
use App\Http\Controllers\ConnectionController;
use App\User;


class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function list_users(Request $request){
        $users = DB::select('SELECT users.id, users.name, users.email, role_user.role FROM users
        LEFT JOIN role_user ON users.role_id = role_user.id');

        return response()->json($users);
    }

    public function delete_user(Request $request){
        $user = DB::delete('DELETE FROM `users` WHERE `id` = :id',['id' => $request->id]);
    
        return response()->json($user);
    }  
    
    public function user_id(Request $request){
        $user = DB::select('SELECT users.id, users.name, users.email, users.role_id, role_user.role
                            FROM users
                            LEFT JOIN role_user ON users.role_id = role_user.id
                            WHERE users.id = :id',['id' => $request->id]);

        return response()->json($user);
    }

    public function update_user(Request $request){
        // $user = DB::update('UPDATE users SET users.name = :name, users.email = :email, users.password = :password, users.role_id = :role_id
        //                     FROM users
        //                     WHERE users.id = :id',['id' => $request->id]);
        $user = new User;
        $user = $user->find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->password <> null) {
          $user->password = Hash::make($request->password);
        }
        $user->role_id = $request->role_id;

        $user->save();

        return response()->json(['status'=>'OK','Message'=>'User Updated!']);
      }


}