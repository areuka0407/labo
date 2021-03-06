<?php

namespace Areuka\Model;

use Areuka\Engine\DB;

class Color {
	// Tag를 가져오는 function(중복X)
	static function getTag($keyword){
		$tagLists = DB::fetchAll("SELECT DISTINCT tag FROM colors");
		$result = [];
		foreach($tagLists as $tagList){
			foreach(explode(" ", $tagList->tag) as $tag){
				if(!in_array($tag, $result) && preg_match("/^(#{$keyword}.*)/", $tag) == true){
					array_push($result, $tag);
				}
					
			}
		}
		return $result;
	}

	// color를 가져오는 function(GET)
	static function getColor($id){
		$colors=array();
		$colors=($id == 0) ? DB::fetchAll("SELECT c.*, u.user_name, u.user_id FROM colors c LEFT JOIN users u ON c.user_id = u.id") : $colors=DB::fetchAll("SELECT * FROM colors WHERE id = ?",[$id]);
		return $colors;
	}

	// color를 DB에 add하는 function(POST)
	static function addColor($user_id, $group_id, $rgb1, $rgb2, $rgb3, $rgb4, $rgb5, $hex1, $hex2, $hex3, $hex4, $hex5, $tag){
		$user=DB::query("SELECT user_id FROM users WHERE user_id = ?",[$user_id]);
		$result=false;
		if($user){
			DB::query("INSERT INTO colors(user_id, group_id, rgb1, rgb2, rgb3, rgb4, rgb5, hex1, hex2, hex3, hex4, hex5, tag, day) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,now())",[$user_id,$group_id,$rgb1,$rgb2,$rgb3,$rgb4,$rgb5,$hex1,$hex2,$hex3,$hex4,$hex5,$tag]);
			$result=true;
		}
		return $result;
	}

	// color를 수정하는 function(PUT)
	static function putColor($id, $rgb1, $rgb2, $rgb3, $rgb4, $rgb5, $hex1, $hex2, $hex3, $hex4, $hex5, $tag){
		$result=false;
		if(DB::query("SELECT id FROM colors WHERE id = ?",[$id])){
			DB::query("UPDATE colors SET rgb1 = ?, rgb2 = ?, rgb3 = ?, rgb4 = ?, rgb5 = ?, hex1 = ?, hex2 = ?, hex3 = ?, hex4 = ?, hex5 = ?, tag = ? WHERE id = ?",[$rgb1,$rgb2,$rgb3,$rgb4,$rgb5,$hex1,$hex2,$hex3,$hex4,$hex5,$tag,$id]);
			$result=true;
		}
		return $result;
	}

	// color를 삭제하는 function(DELETE)
	static function delColor($id){
		if(DB::query("SELECT id FROM colors WHERE id = ?",[$id])){
			DB::query("DELETE FROM colors WHERE id = ?",[$id]);
		}
	}

	// good 관리하는 function(GET)
	static function goodColor($id,$user){
		// session->user의 good정보 가져오기
		$good=DB::fetch("SELECT good FROM users WHERE user_id = ?",[$user]);
		$good=$good->good;
		// click된 color의 good개수 가져오기
		$add=DB::fetch("SELECT good FROM colors WHERE id = ?",[$id]);
		$add=(int)$add->good;
		if($user && $id){
	        $check_result=false;
	        // user의 good정보는 ',' 로 구분됨
            $check = explode(",",$good);
            $check_num = count($check);
            $update_data="";
            for ($i=0; $i < $check_num; $i++){
            	//click된 color가 user의 good에 있을때 user의 good에서 지움 & click된 color의 good 1개감소
                if($id == $check[$i]){
                    $check_result=true;
                }else if($update_data == "") $update_data = $update_data.$check[$i];
		        else $update_data = $update_data.",".$check[$i];
		    }
		    if(!$check_result && $update_data == "") $update_data =$id;
		    else if(!$check_result)$update_data = $update_data.",".$id;
		    DB::query("UPDATE users SET good = ? WHERE user_id = ?",[$update_data,$user]);
            if($check_result == true){
            	$result="minus";
            	$add=$add-1;
            	DB::query("UPDATE colors SET good = ? WHERE id= ?",[$add,$id]);
            }
	        else{
	        	$result="add";
	        	$add=$add+1;
	        	DB::query("UPDATE colors SET good = ? WHERE id = ?",[$add,$id]);
	        }
	    }
	    return $result;
	}
}