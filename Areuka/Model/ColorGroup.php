<?php

namespace Areuka\Model;

use Areuka\Engine\DB;

Class ColorGroup{
	static function find($id){
		return DB::fetch("SELECT * FROM colorgroups WHERE id = ?", [$id]);
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
		$result="";
		$all_name=DB::fetchAll("SELECT name FROM colorgroups WHERE owner_id = ?",[$owner_id]);
		$name_nsame=true;
		for($i = 0;$i < count($all_name);$i++){
			if($all_name[$i]->name == $name){
				$name_nsame=false;
				$result = "same name!";
			}
		}
		if($owner_id && $name && $name_nsame){
			$c_max = DB::fetch("SELECT IFNULL(MAX(idx), 0) AS max FROM colorgroups WHERE owner_id = ? GROUP BY owner_id", [$owner_id]);
			$c_max = $c_max ? $c_max->max : 0;
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

	// group_id로 group 가져오기
	static function getGroupById($group_id){
		return DB::fetch("SELECT * FROM colorgroups WHERE id = ?", [$group_id]);
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
			$all_name=DB::fetchAll("SELECT name FROM colorgroups WHERE owner_id = ?",[$owner]);
			$name_nsame=true;
			for($i = 0;$i < count($all_name);$i++){
				if($all_name[$i]->name == $new_name) $name_nsame=false;
			}
			$result="user not match";
			//group_id가 세션 유저와 같고 변경할 이름이 원래이름과 다른가?
			if($name_nsame&&$owner == $_SESSION['user']->id && $new_name !== $name){
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

	// group index 교체
	static function changeIndex($select,$group_id){
		$result="";
		//select == 0 : down select == 1 : up 
		if($select){
			$index = DB::fetch("SELECT idx FROM colorgroups WHERE id = ?",[$group_id]);
			$index=(int)$index->idx;
			$index_c = DB::fetch("SELECT id FROM colorgroups WHERE idx = ?",[$index-1]);
			$index_c = (int)$index_c->id;
			if(isset($index_c)){
				DB::query("UPDATE colorgroups SET idx = ? WHERE id = ?",[$index-1,$group_id]);
				DB::query("UPDATE colorgroups SET idx = ? WHERE id = ?",[$index,$index_c]);
				$result = "up!";
			}
		}else{
			$index = DB::fetch("SELECT idx FROM colorgroups WHERE id = ?",[$group_id]);
			$index=(int)$index->idx;
			$index_c = DB::fetch("SELECT id FROM colorgroups WHERE idx = ?",[$index+1]);
			$index_c = (int)$index_c->id;
			if(isset($index_c)){
				DB::query("UPDATE colorgroups SET idx = ? WHERE id = ?",[$index+1,$group_id]);
				DB::query("UPDATE colorgroups SET idx = ? WHERE id = ?",[$index,$index_c]);
				$result = "down!";
			}
		}
		return $result;
	}
}