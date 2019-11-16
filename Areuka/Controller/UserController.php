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
        }
        echo json_encode($result);
    }

    public function logoutPage(){
        if(isset($_SESSION['user'])) session_destroy();
    }

    public function userUpdate(){
        // 수정 가능 항목 : 이름 / 생일 / 성별 / 이미지 / 비밀번호
        $id=$_SESSION['user']->id;
        if($_SERVER["REQUEST_METHOD"] == "PUT" && $id){
            // 원래 데이터 가져오기
            $original=DB::fetch("SELECT user_name,y_m_d,gender,image,password FROM users WHERE id = ?",[$id]);
            $putData = file_get_contents("php://input");
            $inputData=array();
            parse_str($putData,$inputData);
            // input 된게 없으면 원래 데이터로 함
            $name = isset($inputData['user_name']) ? $inputData['user_name'] : $original->user_name;
            $y_m_d = isset($inputData['y_m_d']) ? $inputData['y_m_d'] : $original->y_m_d;
            $gender = isset($inputData['gender']) ? $inputData['gender'] : $original->gender;
            $image = isset($inputData['image']) ? $inputData['image'] : $original->image;
            $password = isset($inputData['password']) ? $inputData['password'] : $original->password;
            // 하지만 하나정도는 input 된게 있어야함
            if($name != $original->user_name || $y_m_d != $original->y_m_d || $gender != $original->gender || $image != $original->image || $password != $original->password){
                DB::query("UPDATE users SET user_name = ?, y_m_d = ?, gender = ?, image = ?, password = ? WHERE id = ?",[$name,$y_m_d,$gender,$image,$password,$id]);
                $result = "user update";
            }else{
                $result = "not change";
            }
            echo json_encode($result);
        }
    }

    public function userDel(){
        $id = $_SESSION['user']->id;
        if($_SERVER["REQUEST_METHOD"] == "DELETE" && $id) DB::query("DELETE FROM users WHERE id = ?",[$id]);
        echo json_encode("del");
    }
}