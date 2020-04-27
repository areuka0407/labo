<?php
/**
 * Created by PhpStorm.
 * User: School
 * Date: 2019-09-23
 * Time: 오후 9:30
 */

namespace Areuka\Controller;

use Areuka\Model\User;
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
        $result=User::userjoin($id,$name,$pw,$Y_M_D,$Gender,$login_check);
        echo json_encode($result);
    }

    public function loginPage(){
        header("Content-Type","application/json");
        $result=false;
        $id=$_POST['ID'];
        $pw=hash("sha256",$_POST['PW']);
        $result=User::userlogin($id,$pw);
        echo json_encode($result);
    }

    public function logoutPage(){
        if(isset($_SESSION['user'])) session_destroy();
    }

    public function userUpdate($id){
        // 수정 가능 항목 : 이름 / 생일 / 성별 / 이미지 / 비밀번호
        // 메소드가 PUT인지, $id가 있는지를 검사하는 것은 이미 되어있음

        $putData = file_get_contents("php://input");
        $inputData = (array)json_decode($putData);
        $result=User::userUpdate($id, $inputData);
            
        echo json_encode($result);
        
    }

    public function userDel(){
        $id = $_SESSION['user']->id;
        if($_SERVER["REQUEST_METHOD"] == "DELETE" && $id) User::userDel($id);
        echo json_encode("del");
    }

    public function validPassword(){
        $result = false;

        $password = isset($_POST['password']) ? $_POST['password'] : "";
        if(trim($password) === "") $result = false;
        else if(!user()) $result = false;
        else if(user()->password !== hash("sha256", $password)) $result = false;
        else {
            $_SESSION['validator_time'] = time();
            $result = true;
        }

        echo json_encode($result);
    }

    public function validTime(){
        $result = false;
        if(isset($_SESSION['validator_time'])){
            if(time() - $_SESSION['validator_time'] <= 300) $result = true;
            else {
                unset($_SESSION['validator_time']);
                $result = false;
            }
        }
        else $result = false;

        echo json_encode($result);
    }
}