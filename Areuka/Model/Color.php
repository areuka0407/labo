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
		// for($i=0;$i<$tags_length;$i++){
		// 	$num=explode(" ",$tags[$i]->tag);
		// 	$num_l=count($num);
		// 	for($j=0; $j < $num_l; $j++) {
		// 		if(mb_substr($num[$j], 0, mb_strlen($id)) == $id) 
		// 			array_push($result,$num[$j]); 	
		// 	}
		// }
		return $result;
	}

	// color를 가져오는 function(GET)
	static function getColor($id){
		$colors=array();
		$colors=($id == 0) ? DB::fetchAll("SELECT c.*, u.user_name FROM colors c LEFT JOIN users u ON c.user_id = u.id") : $colors=DB::fetchAll("SELECT * FROM colors WHERE id = ?",[$id]);
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

	// color를 colorgroup안에 추가하는 function()
	// ColorIngroupAdd의 줄임말 ->CIA
	static function CIA($colors_id,$group_id){
		if($colors_id && $group_id){
			DB::query("UPDATE colors SET group_id = ? WHERE id = ?",[$group_id,$colors_id]);
			$result="in group";
		}else $result = "not in group";
		return $result;
	}

	// colorgroup 추가하는 function(POST)
	static function AddCgroup($owner_id,$name){
		if($owner_id && $name){
			$c_max = DB::fetch("SELECT IFNULL(MAX(idx), 0) AS max FROM colorgroups WHERE owner_id = ? GROUP BY owner_id", [$owner_id])->max;
			DB::query("INSERT INTO colorgroups(owner_id, name, idx) VALUES (?,?,?)",[$owner_id, $name, $c_max + 1]);
			$result = DB::fetch("SELECT * FROM colorgroups WHERE id = ?", [DB::lastInsertId()]);
		}else $result="colorgroup not add";
		return $result;
	}

	// user의 colorgroup가져오기 * 수정: users.id 가 아니라 users.user_id 로 검색하도록 수정
	static function getuserCgroup($user_id){
		if($user_id){
			$group=DB::fetchAll("SELECT C.id, C.name, C.idx FROM colorgroups C LEFT JOIN users U ON U.id = C.owner_id WHERE U.user_id = ? ORDER BY C.idx", [$user_id]);
			return $group;
		}
	}

	// group_id에 해당하는 color 가져오기
	static function gcolor($group_id){
		if($group_id){
			$result = DB::fetchAll("SELECT * FROM colors WHERE group_id = ?", [$group_id]);
			return $result;
		}
	}

	// color group 이름 수정
	static function gNameUpdate($group_id,$new_name){
		$result="";
		$group_id=(int)$group_id;
		if($group_id && $new_name != ""){
			//group_id의 owner_id와 name를 가져옴
			$owner=DB::fetch("SELECT owner_id,name FROM colorgroups WHERE id = ?",[$group_id]);
			$name=$owner->name;
			$owner=(int)$owner->owner_id;
			$result="user not match";
			//group_id가 세션 유저와 같고 변경할 이름이 원래이름과 다른가?
			if($owner == $_SESSION['user']->id && $new_name !== $name){
				DB::query("UPDATE colorgroups SET name = ? WHERE id = ?",[$new_name,$group_id]);
				$result="name change";
			}else $result = "name not change";
		}
		return $result;
	}

	// color group 삭제 (DELETE)
	static function cgroupDel($group_id){
		$result = "";
		if($group_id){
			$owner=DB::fetch("SELECT owner_id FROM colorgroups WHERE id = ?",[$group_id]);
			$result="user not match";
			$owner=(int)($owner->owner_id);
			if($owner == $_SESSION['user']->id){
				DB::query("DELETE FROM colorgroups WHERE id = ?",[$group_id]);
				$result="del group";
			}else $result = "group not del";
		}
		return $result;
	}

}