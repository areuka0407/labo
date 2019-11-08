<?php
/**
 * Created by PhpStorm.
 * User: School
 * Date: 2019-10-05
 * Time: 오전 9:22
 */

if(!function_exists("random_str")){
    function random_str($length){
        $result = "";
        $str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
        for($i = 0; $i < $length; $i++){
            $result .= $str[rand(0, strlen($str) - 1)];
        }
        return $result;
    }
}