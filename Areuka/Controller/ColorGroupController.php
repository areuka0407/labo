<?php

namespace Areuka\Controller;

use Areuka\Model\ColorGroup;

class ColorGroupController extends Controller
{
	public function colorIngroupsAdd(){
		if($_SERVER["REQUEST_METHOD"] == "POST"){
			$colors_id = isset($_POST['colors_id']) ? $_POST['colors_id'] : 0;
			$group_id = isset($_POST['group_id']) ? $_POST['group_id'] : 0;
			$result=ColorGroup::CIA($colors_id,$group_id);
			echo json_encode($result);
		}
	}

	public function groupAdd(){
		$id = $_SESSION['user']->id;
		if($id && $_SERVER["REQUEST_METHOD"] == "POST"){
			$groupname=isset($_POST['groupname']) ? $_POST['groupname'] : "";
			$result=ColorGroup::AddCgroup($id,$groupname);
			echo json_encode($result);
		}
	}

	public function userCgroup($user_id){
		$result=ColorGroup::getuserCgroup($user_id);
		echo json_encode($result);
	}

	public function groupcolor($group_id){
		$result=ColorGroup::gcolor($group_id);
		echo json_encode($result);
	}

	public function groupNameChange($group_id){
		$putData = file_get_contents("php://input");
		$inputData= json_decode($putData);
		if(isset($_SESSION['user'])){
			$new_name = isset($inputData->name) ? $inputData->name : "";
			$result = ColorGroup::gNameUpdate($group_id,$new_name);
			echo json_encode($result);
		}
	}

	public function colorgroupDel($group_id){
		if(isset($_SESSION['user'])) $result = ColorGroup::cgroupDel($group_id);
		echo json_encode($result);
	}
	//select == 0 : down select == 1 : up
	public function Upchangeidx($group_id){
		if($group_id && isset($_SESSION['user'])){
			$result=ColorGroup::changeIndex(1,$group_id);
			echo json_encode($result);
		}
	}

	public function Downchangeidx($group_id){
		if($group_id && isset($_SESSION['user'])){
			$result=ColorGroup::changeIndex(0,$group_id);
			echo json_encode($result);
		}
	}
}