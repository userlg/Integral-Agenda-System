<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\User;
use Auth;
use Mail;
Use AWS;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function validateLogin(Request $request)
    {
        $request->validate([
            'email'     => 'required|string|email|max:255',
            'password'  => 'required|string'
        ]);
    }
 

    public function login(Request $request)
    {  
        $this->validateLogin($request);
    
     
        if ( Auth::attempt([ 'email' => $request->email, 'password' => $request->password]) ) {
            
            $user = Auth::user();
            $user->generateToken();
           //$endTime = Carbon::create($request->date);
           // $endTime->addMinutes(1);
            $user->expires_at =  $request->date;
            //$user->save();
            return response()->json($user);
            
         }
        return response()->json([
            'status'    => false, 
            'message'   => 'Acceso negado', 
            'data'      => null
        ],401);
    }



    public function logout(Request $request)
    {
        $this->guard()->logout();

        //$request->session()->invalidate();

        return response()->json(['logout' => 'logout']);
    }
}
