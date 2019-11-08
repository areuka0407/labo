<?php

use Areuka\Engine\DB;


function isAll(){
	return true;
}

function isGuest(){
    return !isset($_SESSION['user']);
}

function isUser(){
    return isset($_SESSION['user']);
}

function isAdmin(){
    return isUser() && $_SESSION['user']->admin;
}