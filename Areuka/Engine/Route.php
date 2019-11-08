<?php

    namespace Areuka\Engine;
    use Areuka\Controller\CommonController;
    use Areuka\Engine\Page;

    class Route {
        /**
         * 각 메소드별 페이지들
         */
        protected static $get = [];
        protected static $post = [];
        protected static $put = [];
        protected static $delete = [];

        protected static $not_found = ""; // 페이지를 찾을 수 없을 시 취할 컨트롤러@메소드
        
        /**
         * 페이지 설정 함수 ( route/web.php 에서 사용 )
         */
        public static function set($http_method, $request_uri, $action, $permission = "GUEST"){
            $http_method = strtolower($http_method);
            array_push(self::${$http_method}, new Page($request_uri, $action, ucfirst(strtolower($permission))));
            return;
        }

        /**
         * 현재 URL을 가져오는 함수
         */
        public static function getURL(){
            $url = "/";
            $url .= isset($_GET['request']) && trim($_GET['request']) !== 'index.php' ? filter_var(rtrim($_GET['request']), FILTER_SANITIZE_URL) : "";
            return $url;
        }

        public static function connect(){
            $url = self::getURL();
            foreach(self::${strtolower($_SERVER['REQUEST_METHOD'])} as $page){
                if($page->match($url) && call_user_func("is".$page->permission)){
                    return $page->execute();
                }
            }

            CommonController::page_not_found();
            return false;
        }
    }