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
}