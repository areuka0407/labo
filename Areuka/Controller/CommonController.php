<?php
/**
 * Created by PhpStorm.
 * User: School
 * Date: 2019-09-23
 * Time: 오후 7:41
 */

namespace Areuka\Controller;


class CommonController extends Controller
{
    public function homePage(){
        return $this->view("home");
    }

    public function viewPage($id){
        echo $id;
    }

    public static function page_not_found(){
        echo "페이지를 찾을 수 없습니다.";
    }
}