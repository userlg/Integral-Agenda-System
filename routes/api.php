<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*SUBDOMAIN ROUTES*/
Route::post('/url/validate', 'RoleController@permitValidate');

/*DATABASE ROUTES*/
Route::get('/list_databases', 'CompanyController@show_databases');

Route::get('/switch_database_to/{name}', 'ConnectionController@redirectDatabase');
Route::get('/switch_database_default', 'ConnectionController@RedirectDefaultDatabase');
Route::get('/list_parameters/{name}', 'ConnectionController@ListParameters');
Route::post('/change_parameter', 'ConnectionController@ChangeParameter');
Route::get('/show_balance/{name}', 'ConnectionController@ShowBalance');

/*AUTH ROUTES */
/*$this->get('login', 'Auth\LoginController@showLoginForm')->name('login');
$this->post('login', 'Auth\LoginController@login');
$this->post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes...
$this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');*/
Route::post('/user/register', 'Auth\RegisterController@register');
Route::post('/role/create', 'RoleController@create_role');
Route::get('/role/list', 'RoleController@list_role');
Route::get('/role/{id}', 'RoleController@role_id');
Route::get('/role_permit/{role_id}', 'RoleController@role_permit');
Route::get('/role/menu/list', 'RoleController@menuDinamic');
Route::post('/delete_role', 'RoleController@delete_role');
Route::get('/role/module/{id}', 'RoleController@role_by_module_permit');


// Password Reset Routes...
/*$this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
$this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
$this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
$this->post('password/reset', 'Auth\ResetPasswordController@reset');*/

Auth::routes();

//PERMITS ROUTES
Route::post('/permit/post', 'PermitController@save_permit');
Route::get('/permit/get/{role_id}', 'PermitController@get_permit');
Route::get('/permit/modules/', 'PermitController@get_modules');


//USERS
Route::get('/list_users', 'UserController@list_users');
Route::post('/delete_user', 'UserController@delete_user');
Route::get('/edit_user/{id}', 'UserController@user_id');
Route::put('/update_user', 'UserController@update_user');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
