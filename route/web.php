<?php

use Areuka\Engine\Route;
include "permission.php";

// 기본적인 형식
// Route::set("HTTP_METHOD", "url", "Controller@method", "permission");
// permission :: Guest(기본값), User, Admin

/**
 * All
 */
Route::set("GET", "/", "CommonController@homePage", "All");
Route::set("POST","/users/session","SessionController@session_userPage","All");
Route::set("GET","/users/color","ColorController@ApiController","All");
Route::set("GET","/users/color/{id}","ColorController@ApiController","All");
/**
 * Guest
 */
Route::set("GET", "/join/agree", "UserController@agreePage", "Guest");
Route::set("GET", "/join/info", "UserController@infoPage", "Guest");
Route::set("GET", "/join/success", "UserController@successPage", "Guest");
Route::set("POST","/users/join","UserController@joinPage","Guest");
Route::set("POST","/users/login","UserController@loginPage","Guest");
/**
 * User
 */
Route::set("POST","/users/logout","UserController@logoutPage","User");
Route::set("POST","/users/color","ColorController@ApiController","User");
Route::set("DELETE","/users/color/{id}","ColorController@ApiController","User");
Route::set("PUT","/users/color/{id}","ColorController@ApiController","User");
Route::set("GET","/users/good/{id}","ColorController@ApiController","User");
/**
 * Admin
 */
