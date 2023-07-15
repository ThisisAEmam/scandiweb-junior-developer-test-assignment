<?php

declare(strict_types = 1);

require_once __DIR__ . "/config/autoloader.php";
require_once __DIR__ . "/config/headers.php";
require_once __DIR__ . "/config/database.php";
require_once __DIR__ . "/config/config.php";

use Controller\Controller;

$controller = new Controller();
$resp = $controller->processRequest();
echo $resp;