<?php
/**
 * Created by PhpStorm.
 * User: School
 * Date: 2019-09-23
 * Time: 오후 9:30
 */

namespace Areuka\Controller;

use Areuka\Engine\DB;

class UserController extends Controller
{
    /**
     * 회원가입
     */
    public function agreePage(){
        return $this->view("join.agree");
    }
    public function infoPage(){
        return $this->view("join.info");
    }
    public function successPage(){
        $data['name'] = $_SESSION['user_name'];
        return $this->view("join.success", $data);
    }
    public function joinPage(){
        header("Content-Type","application/json");

        $id=$_POST['ID'];
        $pw=hash("SHA256",$_POST['password']);
        $name=$_POST['nickname'];
        $Y_M_D=$_POST['y_m_d'];
        $Gender=$_POST['gender'];
        $login_check=$_POST['login_check'];
        if($login_check == "id"){
            $result=DB::fetch("SELECT user_id FROM users WHERE user_id = ?",[$id]);
            echo json_encode(["result"=>$result]);
        }else if($login_check == "name"){
            $result=DB::fetch("SELECT user_name FROM users WHERE user_name = ?",[$name]);
            echo json_encode(["result"=>$result]);
        }else{
            // 회원가입
            DB::query("INSERT INTO users(user_id,user_name,password,y_m_d,gender) VALUES(?,?,?,?,?)",[$id,$name,$pw,$Y_M_D,$Gender]);
            echo json_encode(["result" => true]);
        }
    }

    public function loginPage(){
        header("Content-Type","application/json");
        $result=false;
        $id=$_POST['ID'];
        $pw=hash("sha256",$_POST['PW']);
        $user=DB::fetch("SELECT * FROM users WHERE user_id = ? AND password = ?",[$id,$pw]);
        if($user){
            $_SESSION['user']=$user;
            $result=true;
        }else{
            $result="아이디 또는 비밀번호가 일치하지 않습니다.";
        }
        echo json_encode($result);
    }
    public function logoutPage(){
        // unset($_SESSION['user']);
        $result=true;
        if(isset($_SESSION['user'])) session_destroy();
        echo json_encode($result);
    }
    public function goodPage(){
        $request = isset($_GET['request']) ? $_GET['request'] : "";
        $path = explode("/",$request);
        $id = isset($path[2]) ? $path[2] : 0;
        $user = $_SESSION['user']->user_id;
        $good = DB::fetch("SELECT good FROM users WHERE user_id = ?",[$user]);
        echo json_encode($good);
        if($user && $id){
        //     if($goods){
        //         $check_result=false;
        //         $check = explode(",",$goods);
        //         $check_num = count($check);
        //         $id_good=(int)DB::query("SELECT good FROM color WHERE id = ?",$id);
        //         for ($i=0; $i < $check_num; $i++) { 
        //             if($id == $check[$i]){
        //                 $check_result=true;
        //                 break;
        //             }else if(!$update_data) $update_data = $update_data.$check[$i];
        //             else $update_data = $update_data.",".$check[$i];
        //         }
        //         DB::query("UPDATE users SET good = ?",[$update_data]);
        //         $result = "good update";
        //         if($check_result) DB::query("INSERT INTO color(good) VALUES (?)",[$id_good+1]);
        //         else DB::query("INSERT INTO color(good) VALUES (?)",[$id_good-1]);
        //     }
        //     else{
        //         DB::query("INSERT INTO users(good) VALUES (?)",[$id]);
        //         $result = "good insert";
        //         DB::query("INSERT INTO color(good) VALUES (?)",[1]);
        //     }
        }
        // echo json_encode($result);
    }
}