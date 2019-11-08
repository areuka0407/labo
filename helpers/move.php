<?php
    if(!function_exists("message")){
        function message($message = "")
        {
            try {
                if($message !== "")
                {
                    $result = "";
                    if(isset($_SESSION['message'])){
                        $result = $_SESSION['message'];
                        unset($_SESSION['message']);
                    }
                    return $result;
                }
                else
                {
                    $_SESSION['message'] = $message;
                    return true;
                }
            } catch (\Exception $e){
                return false;
            }
        }
    }

    if(!function_exists("redirect"))
    {
        function redirect($url, $message = "")
        {
            message($message);
            header("Location: {$url}");
            header("HTTP/1.1 301 Moved Permanently");
        }
    }

    if(!function_exists("back"))
    {
        function back($message)
        {
            message($message);
            header("Location: ". $_SERVER['HTTP_REFERER']);
            header("HTTP/1.1 301 Moved Permanently");
        }
    }