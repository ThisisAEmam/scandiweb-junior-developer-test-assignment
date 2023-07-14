<?php

require_once __DIR__ . "/../ErrorHandler/ErrorHandler.php";

set_exception_handler("ErrorHandler::handleException");

define("POPULATE_DATA_PATH", dirname(__DIR__) . "/Database/populateData.json");