<?php

namespace Controller;

use api\Responses\CreatedResponse;
use api\Responses\NotFoundResponse;
use api\Responses\ServerErrorResponse;
use api\Responses\SuccessResponse;
use Database\PopulateDatabase;

class Controller
{
    private string $req_uri;
    private array $req_uri_parts;

    public function __construct()
    {
        $this->req_uri = $_SERVER["REQUEST_URI"];
        $this->req_uri_parts = explode( "/", parse_url($this->req_uri, PHP_URL_PATH));
    }

    public function processRequest(): string|false
    {
        if ($this->req_uri === "/") {
            return SuccessResponse::makeResponse(["msg" => "Welcome to scandiweb's Web Developer Test Assignment API."]);
        } elseif ($this->req_uri === "/populate") {
            $err = PopulateDatabase::populate();
            if ($err) {
                return ServerErrorResponse::makeResponse(array($err));
            }
            return CreatedResponse::makeResponse(["msg" => "Database Populated successfully"]);
        } elseif ($this->req_uri_parts[1] === "products") {
            $id = $this->req_uri_parts[2] ?? null;
            $productController = new ProductController();
            return $productController->processRequest($_SERVER["REQUEST_METHOD"], $id);
        } else {
            return NotFoundResponse::makeResponse(["msg" => "Endpoint not found"]);
        }
    }
}