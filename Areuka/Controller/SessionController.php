<?php
/**
 * Created by PhpStorm.
 * User: School
 * Date: 2019-09-23
 * Time: 오후 9:28
 */

namespace Areuka\Controller;

use Areuka\Engine\DB;

class SessionController extends Controller
{
	public function session_userPage(){
        $result=false;
        if(isset($_SESSION['user'])){
        	$result=DB::fetch("SELECT * FROM users WHERE id = ?",[$id]);
	        $id= $_SESSION['user']->id;
        }
        echo json_encode($result);
    }
}