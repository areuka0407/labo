<?php
    function loadClass($c){
        $prefix = "Areuka";
        if(strncmp($prefix, $c, strlen($prefix)) !== 0) return;
        $className = str_replace("\\", DS, $c) . ".php";
        $classPath = ROOT . DS. $className;
        if(is_file($classPath)) require $classPath;
        return;     
    }

    spl_autoload_register("loadClass");