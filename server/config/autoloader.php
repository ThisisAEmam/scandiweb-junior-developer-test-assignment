<?php

spl_autoload_register(function($classname){
    $path =  dirname(__DIR__). "/" . str_replace("\\", "/", $classname) . ".php";

    require $path;
});