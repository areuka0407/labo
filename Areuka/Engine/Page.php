<?php

    namespace Areuka\Engine;
    use Areuka\Engine\DB;

    class Page {
        public $url;            // 해당 페이지를 연결할 URL
        public $permission;     // 해당 페이지의 이용 제한
        public $controller;     // 해당 페이지의 컨트롤러 클래스명
        public $method;         // 해당 페이지에서 취할 행동
        public $matchArr = [];   // URL 매칭 배열
        
        /**
         * 페이지 설정에서 필요한 것은 URL, 취할 행동, 제한 조건이 있다.
         * @permission : route/permission.php 에 조건에서 TRUE를 반환시 해당 라우팅 반환
         */

        function __construct($url, $action, $permission = "Guest")
        {
            $this->url = trim($url) !== "" ? $url : "/";
            $this->permission = $permission;
            if(is_callable($action)) $this->method = $action; // 컨트롤러 메소드가 아닌, 일반 함수도 사용할 수 있게 하기 위함
            else 
            {
                $split = explode("@", $action);
                $this->controller = $split[0];
                $this->method = $split[1];
            }

        }

        /**
         * URL 매칭
         * /users/${user_id}가 있으면
         * /users/areuka0102 와 같은 아이디가 삽입되었을 시 정상적으로 작동하면서,
         * [user_id => areuka0102] 와 같은 배열을 $this->matchArr 변수에 저장하도록 해야한다.
         * 
         * 부가적으로, 각각의 URL을 입력했을 때 users 테이블에서 컬럼과 값이 일치하는 지도 확인해야만 한다.
         */      
        function match($current_url){
            $regexr = preg_replace("/{([^\/]+)}/", "(?<$1>[^/]+)", $this->url);
            $regexr = preg_replace("/\//", "\\/", $regexr);
            $match = preg_match("/^{$regexr}$/", $current_url, $this->matchArr);
            return $match;
        }

        /**
         * Controller 에서 페이지 실행
         *
         */
        function execute(){
            if(is_callable($this->method)) return call_user_func_array($this->method, $this->matchArr);
            $conName = "Areuka\\Controller\\{$this->controller}";
            $con = new $conName();
            $reflection = new \ReflectionMethod($con, $this->method);
            $params = $reflection->getParameters();
            $args = [];
            foreach($params as $param){
                $p_name = $param->getName();
                if(isset($this->matchArr[$p_name])) $args[] = $this->matchArr[$p_name];
            }
            return call_user_func_array([$con, $this->method], $args);
        }
    }