<?php
session_start();
/**
 * 서버 설정
 */
define("HOST_NAME", "localhost");
define("DB_NAME", "labo");
define("USER_NAME", "root");
define("PASSWORD", "");

/**
 * 상수 설정
 */
define("DS", DIRECTORY_SEPARATOR);
define("ROOT", dirname(__DIR__));
define("PULBIC", __DIR__);
define("APP", ROOT.DS."App");
define("HELPERS", ROOT.DS."helpers");
define("ROUTE", ROOT.DS."route");
define("ENGINE", APP.DS."Engine");

/**
 * 시간대 설정
 */
date_default_timezone_set("Asia/Seoul");

/**
 * Include
 */

include HELPERS.DS."autoload.php";
include ROUTE.DS."web.php";
include_once HELPERS.DS."random.php";
include_once HELPERS.DS."move.php";
include_once HELPERS.DS."debug.php";

/**
 * Route
 */

use Areuka\Engine\Route;
Route::connect();