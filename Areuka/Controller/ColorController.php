<?php

namespace Areuka\Controller;

use Areuka\Engine\DB;

class ColorController extends Controller
{

	public function ApiController(){
		$method = $_SERVER["REQUEST_METHOD"];
		$request = isset($_GET['request']) ? $_GET['request'] : "";
		$path = explode("/",$request);
		$work = isset($path[1]) ? $path[1] : "";
		$id = isset($path[2]) ? $path[2] : 0;
		if($work == "color"){
			if($method=="GET"){
				$colors=array();
				$colors=($id == 0) ? DB::fetchAll("SELECT * FROM color") : $colors=DB::fetchAll("SELECT * FROM color WHERE id = ?",[$id]);
				echo json_encode($colors);
			}
			if($method == "POST"){
				$user_id=isset($_POST['user_id']) ? $_POST['user_id'] : '';
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
				$user=DB::query("SELECT user_id FROM users WHERE user_id = ?",[$user_id]);
				$result=false;
				if($user){
					DB::query("INSERT INTO color(user_id,rgb1,rgb2,rgb3,rgb4,rgb5,hex1,hex2,hex3,hex4,hex5,tag,day) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,now())",[$user_id,$rgb1,$rgb2,$rgb3,$rgb4,$rgb5,$hex1,$hex2,$hex3,$hex4,$hex5,$tag]);
					$result=true;
				}
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
					$result=false;
					if(DB::query("SELECT id FROM color WHERE id = ?",[$id])){
						DB::query("UPDATE color SET rgb1 = ?,rgb2 = ?,rgb3 = ?,rgb4 = ?,rgb5 = ?,hex1 = ?,hex2 = ?,hex3 = ?,hex4 = ?,hex5=?,tag = ? WHERE id = ?",[$rgb1,$rgb2,$rgb3,$rgb4,$rgb5,$hex1,$hex2,$hex3,$hex4,$hex5,$tag,$id]);
						$result=true;
					}
					echo json_encode($result);
				}
			}
			if($method == "DELETE"){
				if($id){
					if(DB::query("SELECT id FROM color WHERE id = ?",[$id])){
						DB::query("DELETE FROM color WHERE id = ?",[$id]);
					}
				}
			}
		}else if($work == "good"){
			if($method == "GET"){
				$user = $_SESSION['user']->user_id;
		        $good=DB::fetch("SELECT good FROM users WHERE user_id = ?",[$user]);
		        $good=$good->good;
		        if($user && $id){
		            if($good){
		                $check_result=false;
		                $check = explode(",",$good);
		                $check_num = count($check);
		                $id_good=DB::fetch("SELECT good FROM color WHERE id = ?",[$id]);
		                $update_data="";
		                $id_good=(int)$id_good->good;
		                for ($i=0; $i < $check_num; $i++) { 
		                    if($id == $check[$i]){
		                           $check_result=true;
		                            break;
		                    }else if(!$i == $check_num) $update_data = $update_data.$check[$i];
		                    else $update_data = $update_data.",".$check[$i];
		                }
		                echo json_encode($check_result);
		                DB::query("UPDATE users SET good = ? WHERE user_id = ?",[$update_data,$user]);
		                $result = "good update";
		                if($check_result == true) DB::query("UPDATE color SET good = ? WHERE id= ?",[$id_good-1,$id]);
		                else DB::query("UPDATE color SET good = ? WHERE id = ?",[$id_good+1,$id]);
		            }
		            else{
		                DB::query("UPDATE users SET good = ? WHERE user_id = ?",[$id,$user]);
		                $result = "good insert";
		                DB::query("UPDATE color SET good = ? WHERE id = ?",[$id_good+1,$id]);
		            }
		        }
		        // echo json_encode($result);
			}
		}
	}
}