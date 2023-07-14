<?php

header('Content-type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 600");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
if (isset($_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
