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

  Route::set("GET","/api/users/{user_id}/groups","ColorGroupController@userCgroup","All");
  Route::set("GET","/api/groups/{group_id}/colors","ColorGroupController@groupcolor","All");

  /* Colors */
  Route::set("GET","/colors/picker","ColorController@ColorPickerPage","All"); //조합 페이지
  Route::set("GET", "/colors/search", "ColorController@searchPage", "All");   //검색 페이지
  Route::set("GET", "/colors/storage/{user_id}", "ColorController@storagePage", "All"); // 보관 페이지
  Route::set("GET", "/colors/storage/{user_id}/groups/{group_id}", "ColorController@groupPage", "All"); // 그룹 페이지

  /* Colors */
  Route::set("GET","/colors/picker","ColorController@ColorPickerPage","All"); //조합 페이지
  Route::set("GET", "/colors/search", "ColorController@searchPage", "All");   //검색 페이지

  /* 이용 가이드 */
  Route::set("GET", "/guide", "GuideController@homePage", "All");
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
  /* Option */
<<<<<<< HEAD
  Route::set("GET", "/option", "OptionController@userPage", "User");
  Route::set("GET", "/option/user", "OptionController@userPage", "User");
  Route::set("GET", "/option/password", "OptionController@passwordPage", "User");
  Route::set("GET", "/option/profile-image", "OptionController@imagePage", "User");

  /* Option - Validator */
  Route::set("POST", "/api/validator/password", "UserController@validPassword", "User");
  Route::set("POST", "/api/validator/time", "UserController@validTime", "User");
=======
  Route::set("GET", "/option", "OptionController@homePage", "User");
>>>>>>> 2581b96... 사용자 설정 페이지 추가

  /* Logout */
  Route::set("POST","/users/logout","UserController@logoutPage","User");

  /* API */
  Route::set("POST","/api/colors","ColorController@ApiController","User");
  Route::set("DELETE","/api/colors/{id}","ColorController@ApiController","User");
  Route::set("PUT","/api/colors/{id}","ColorController@ApiController","User");
  Route::set("GET","/api/good/{id}","ColorController@addgood","User");
  
  Route::set("POST", "/api/groups", "ColorGroupController@groupAdd", "User");
  Route::set("PUT","/api/groups/{group_id}","ColorGroupController@groupNameChange","All");
  Route::set("DELETE","/api/groups/{group_id}","ColorGroupController@colorgroupDel","User");
  Route::set("PUT","/api/groups/{group_id}/up","ColorGroupController@Upchangeidx","User");
  Route::set("PUT","/api/groups/{group_id}/down","ColorGroupController@Downchangeidx","User");

  /* userpage */
  Route::set("PUT","/users/{id}","UserController@userUpdate","User");
  Route::set("DELETE","/users/user","UserController@userDel","User");

/**
 * Admin
 */