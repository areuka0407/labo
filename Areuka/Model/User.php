<?php

namespace Areuka\Model;

use Areuka\Engine\DB;

class User{
    static function find($id){
        return DB::fetch("SELECT * FROM users WHERE id = ?", [$id]);    
    }

    static function getByUserId($user_id){
        return DB::fetch("SELECT * FROM users WHERE user_id = ?", [$user_id]);
    }

	// 회원가입 function (POST)
	static function userjoin($id,$name,$pw,$Y_M_D,$Gender,$login_check){
		$answer="";
		$result=false;
		if($login_check == "id"){
            $result=DB::fetch("SELECT user_id FROM users WHERE user_id = ?",[$id]);
            $answer=["result"=>$result];
        }else if($login_check == "name"){
            $result=DB::fetch("SELECT user_name FROM users WHERE user_name = ?",[$name]);
            $answer=["result"=>$result];
        }else{
            // 회원가입
            DB::query("INSERT INTO users(user_id,user_name,password,y_m_d,gender) VALUES(?,?,?,?,?)",[$id,$name,$pw,$Y_M_D,$Gender]);
            $owner=DB::fetch("SELECT id FROM users WHERE user_id = ?",[$id]);
            $owner=(int)$owner->id;
            DB::query("INSERT INTO colorgroups(owner_id,name) VALUES (?,'기본')",[$owner]);
            $answer=["result" => true];
        }
        return $answer;
	}

	// 로그인 function (POST)
	static function userlogin($id,$pw){
		$result=false;
		if($id && $pw && !isset($_SESSION['user'])){
			$user=DB::fetch("SELECT * FROM users WHERE user_id = ? AND password = ?",[$id,$pw]);
			if($user){
				$_SESSION['user']=$user;
				$result=true;
			}
		}
		return $result;
	}

	// 유저 정보변경 (PUT)
	static function userUpdate($id){
		$result="";
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
        }else $result = "not change";
        return $result;
	}

	// 유저 삭제 (DELETE)
	static function userDel($id){
		DB::query("DELETE FROM users WHERE id = ?",[$id]);
	}
}