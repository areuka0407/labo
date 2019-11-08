<?php
/**
 * Created by PhpStorm.
 * User: School
 * Date: 2019-09-23
 * Time: 오후 9:28
 */

namespace Areuka\Controller;


class SessionController extends Controller
{
	public function session_userPage(){
        $result=false;
        if(isset($_SESSION['user'])) $result=$_SESSION['user']->user_name;
        echo json_encode($result);
    }
}