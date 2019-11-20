<?php

use Areuka\Engine\Route;
include "permission.php";

// 기본적인 형식
// Route::set("HTTP_METHOD", "url", "Controller@method", "permission");
// permission :: Guest(기본값), User, Admin

/**
 * All
 */
  /* General */
  Route::set("GET", "/", "CommonController@homePage", "All");
  Route::set("POST","/users/session","SessionController@session_userPage","All");

  /* Colors */
  Route::set("GET","/colors/picker","ColorController@pickerPage","All"); //조합 페이지
  Route::set("GET", "/colors/search", "ColorController@searchPage", "All");   //검색 페이지

  /* API */
  Route::set("GET", "/api/colors","ColorController@ApiController","All");
  Route::set("GET", "/api/colors/{id}","ColorController@ApiController","All");
  Route::set("GET", "/api/tags","ColorController@getTags","All");

  Route::set("GET","/api/users/{user_id}/groups","ColorController@userCgroup","All");
  Route::set("GET","/api/groups/{group_id}/colors","ColorController@groupcolor","All");

  /* Colors */
  Route::set("GET","/colors/picker","ColorController@ColorPickerPage","All"); //조합 페이지
  Route::set("GET", "/colors/search", "ColorController@searchPage", "All");   //검색 페이지
  Route::set("GET", "/colors/storage/{user_id}", "ColorController@storagePage", "All"); // 보관 페이지
  Route::set("GET", "/colors/storage/{user_id}/groups/{group_id}", "ColorController@groupPage", "All"); // 그룹 페이지

  /* Colors */
  Route::set("GET","/colors/picker","ColorController@ColorPickerPage","All"); //조합 페이지
  Route::set("GET", "/colors/search", "ColorController@searchPage", "All");   //검색 페이지
/**
 * Guest
 */

  /* Join */
  Route::set("GET", "/join/agree", "UserController@agreePage", "Guest");
  Route::set("GET", "/join/info", "UserController@infoPage", "Guest");
  Route::set("GET", "/join/success", "UserController@successPage", "Guest");
  Route::set("POST","/users/join","UserController@joinPage","Guest");

  /* Login */
  Route::set("POST","/users/login","UserController@loginPage","Guest");

/**
 * User
 */

  /* Logout */
  Route::set("POST","/users/logout","UserController@logoutPage","User");

  /* API */
  Route::set("POST","/api/colors","ColorController@ApiController","User");
  Route::set("DELETE","/api/colors/{id}","ColorController@ApiController","User");
  Route::set("PUT","/api/colors/{id}","ColorController@ApiController","User");
  Route::set("GET","/api/good/{id}","ColorController@addgood","User");
  
  Route::set("POST", "/api/groups", "ColorController@groupAdd", "User");
  Route::set("PUT","/api/groups/{group_id}","ColorController@groupNameChange","All");
  Route::set("DELETE","/api/groups/{group_id}","ColorController@colorgroupDel","User");
  Route::set("PUT","/api/groups/{group_id}/up","ColorController@upchangeidx","User");
  Route::set("PUT","/api/groups/{group_id}/down","ColorController@Downchangeidx","User");

  /* userpage */
  Route::set("PUT","/users/user","UserController@userUpdate","User");
  Route::set("DELETE","/users/user","UserController@userDel","User");

/**
 * Admin
 */
