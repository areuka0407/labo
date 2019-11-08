<?php
/**
 * Created by PhpStorm.
 * User: School
 * Date: 2019-09-23
 * Time: 오후 7:51
 */

namespace Areuka\Controller;


class Controller
{
    private static $viewPath = ROOT.DS."views";

    protected function view($page, $data = [], $structure = "structure.php"){
        extract($data);
        $page = preg_replace("/(\/|\.)/",  DS, $page); // 점 연산자(.) 사용할 수 있도록 Replace

        $structure = self::$viewPath . DS . $structure; // 전체적인 구조 ( 이하 '구조' )
        $viewPage = self::$viewPath . DS . $page . ".php"; // 보여줄 페이지 ( 이하 '뷰' )

        $s_file = file_get_contents($structure); // 구조 파일
        $v_file = file_get_contents($viewPage); // 뷰 파일
        $common = file_get_contents(ROOT.DS."views".DS."common.php"); // 기본 <head> 파일

        preg_match_all("/<!--@([a-zA-Z0-9]+)-->/", $s_file, $matches); // Match 시킬 정규식
        $replaces = [];
        // 컴포넌트 분리 및 데이터화
        foreach($matches[1] as $match){
            $replaces[] = (object)["name" => $match, "fullName" => "<!--@{$match}-->", "offset" => mb_strpos($s_file, "<!--@{$match}-->")];
        }

        // 뷰에서 데이터를 끌어와 구조 파일에 적용시킴
        foreach($replaces as $replace){
            $start = mb_strpos($v_file, "<!--{$replace->name}-->") + mb_strlen($replace->fullName); // 시작할 위치
            $end = mb_strpos($v_file, "<!--/{$replace->name}-->"); //종료할 위치
            $component = mb_substr($v_file, $start, $end);

            $s_file = str_replace($replace->fullName, $component, $s_file);
        }
        $s_file = str_replace( "<!--#common-->", $common, $s_file);


        do {
            $save_filename = random_str(15). ".php";
        } while(is_file(ROOT.DS."buffer".DS.$save_filename));

        file_put_contents(ROOT.DS."buffer".DS."".$save_filename, $s_file);

        require ROOT.DS."buffer".DS."".$save_filename;

        unlink(ROOT.DS."buffer".DS."".$save_filename);

        return true;
    }
}