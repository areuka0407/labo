<?php
/**
 * Created by PhpStorm.
 * User: School
 * Date: 2019-09-23
 * Time: 오후 7:31
 */

if(!function_exists("dd")){
    function dump(){
        foreach(func_get_args() as $arg){
            echo "<pre>";
            var_dump($arg);
            echo "</pre>";
        }
    }
}

if(!function_exists("dd")){
    function dd(){
        call_user_func_array("dump", func_get_args());
        exit;
    }
}