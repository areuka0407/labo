<?php

if(!function_exists("user")){
    function user(){
        return @isset($_SESSION['user']) ? $_SESSION['user'] : false;
    }
}

if(!function_exists("userIs")){
    function userIs($id){
        return user() && user()->id === $id;
    }
}