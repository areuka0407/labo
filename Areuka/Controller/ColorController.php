<?php

namespace Areuka\Controller;

use Areuka\Model\User;
use Areuka\Model\Color;
use Areuka\Model\ColorGroup;


class ColorController extends Controller
{
	// 색 조합 페이지
	public function pickerPage(){
		$groups = [];
		if(user()) $groups = ColorGroup::getuserCgroup(user()->user_id);
		return $this->view("colors.picker", ["groups" => $groups], "colors.structure");
	}

	// 색 검색 페이지
	public function searchPage(){
		return $this->view("colors.search", [], "colors.structure");
	}

	// 색 보관 페이지
	public function storagePage($user_id){
		$owner = User::getByUserId($user_id);
		if(!$owner) return CommonController::page_not_found();
		return $this->view("colors.storage", ['owner' => $owner], "colors.structure");
	}

	public function groupPage($user_id, $group_id){
		$owner = User::getByUserId($user_id);
		if(!$owner) return CommonController::page_not_found();

		$group = Color::getGroupById($owner->id);
		return $this->view("colors.group", ['owner' => $owner], "colors.structure");
	}


	public function getTags(){
		$keyword = trim($_GET['keyword']);
		if($keyword === "") {
			echo json_encode(false);
			exit;
		}
		$keyword = urldecode($keyword);
		// echo json_encode($keyword);

		$result = Color::getTag($keyword);
		echo json_encode($result);
	}

	// 색상 검색 / 추가 / 수정 / 삭제 (Default)
	public function ApiController(){
		header("Content-type", "application/json");

		$method = $_SERVER["REQUEST_METHOD"];
		$request = isset($_GET['request']) ? $_GET['request'] : "";
		$path = explode("/",$request);
		$work = isset($path[1]) ? $path[1] : "";
		$id = isset($path[2]) ? $path[2] : 0;
		if($work == "colors"){
			if($method=="GET"){
				$result=Color::getColor($id);
				echo json_encode($result);
			}
			if($method == "POST"){
				$user_id=isset($_POST['user_id']) ? $_POST['user_id'] : '';
				$group_id = isset($_POST['group_id']) ? $_POST['group_id'] : "";
				$rgb1=isset($_POST['rgb1']) ? $_POST['rgb1'] : '';
				$rgb2=isset($_POST['rgb2']) ? $_POST['rgb2'] : '';
				$rgb3=isset($_POST['rgb3']) ? $_POST['rgb3'] : '';
				$rgb4=isset($_POST['rgb4']) ? $_POST['rgb4'] : '';
				$rgb5=isset($_POST['rgb5']) ? $_POST['rgb5'] : '';
				$hex1=isset($_POST['hex1']) ? $_POST['hex1'] : '';
				$hex2=isset($_POST['hex2']) ? $_POST['hex2'] : '';
				$hex3=isset($_POST['hex3']) ? $_POST['hex3'] : '';
				$hex4=isset($_POST['hex4']) ? $_POST['hex4'] : '';
				$hex5=isset($_POST['hex5']) ? $_POST['hex5'] : '';
				$tag=isset($_POST['tag']) ? $_POST['tag'] : '';
				$result=Color::addColor($user_id, $group_id, $rgb1, $rgb2, $rgb3, $rgb4, $rgb5, $hex1, $hex2, $hex3, $hex4, $hex5, $tag);
				echo json_encode($result);
			}
			if($method == "PUT"){
				if($id){
					$putData = file_get_contents("php://input");
					$inputData=array();
					parse_str($putData,$inputData);
					$rgb1=isset($inputData['rgb1']) ? $inputData['rgb1'] : '';
					$rgb2=isset($inputData['rgb2']) ? $inputData['rgb2'] : '';
					$rgb3=isset($inputData['rgb3']) ? $inputData['rgb3'] : '';
					$rgb4=isset($inputData['rgb4']) ? $inputData['rgb4'] : '';
					$rgb5=isset($inputData['rgb5']) ? $inputData['rgb5'] : '';
					$hex1=isset($inputData['hex1']) ? $inputData['hex1'] : '';
					$hex2=isset($inputData['hex2']) ? $inputData['hex2'] : '';
					$hex3=isset($inputData['hex3']) ? $inputData['hex3'] : '';
					$hex4=isset($inputData['hex4']) ? $inputData['hex4'] : '';
					$hex5=isset($inputData['hex5']) ? $inputData['hex5'] : '';
					$tag =isset($inputData['tag'])  ? $inputData['tag'] : '';
					$result=Color::putColor($id,$rgb1,$rgb2,$rgb3,$rgb4,$rgb5,$hex1,$hex2,$hex3,$hex4,$hex5,$tag);
					
					echo json_encode($result);
				}
			}
			if($method == "DELETE"){
				if($id) Color::delColor($id);
			}
		}
	}


	// 좋아요 표시하기
	public function addgood($id){
		$id=(int)$id;
		$user = $_SESSION['user']->user_id;
		$result=Color::goodColor($id,$user);
	    echo json_encode($result);
	}
}