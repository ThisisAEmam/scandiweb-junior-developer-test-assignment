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

    public function processRequest(): void
    {
        if ($this->req_uri === "/") {
            SuccessResponse::makeResponse(["msg" => "Welcome to scandiweb's Web Developer Test Assignment API."]);
            exit();     
        } elseif ($this->req_uri === "/populate") {
            $err = PopulateDatabase::populate();
            if ($err) {
                ServerErrorResponse::makeResponse(array($err));
                exit();
            }
            CreatedResponse::makeResponse(["msg" => "Database Populated successfully"]);
            exit();
        } elseif ($this->req_uri_parts[1] === "products") {
            $id = $this->req_uri_parts[2] ?? null;
            $productController = new ProductController();
            $productController->processRequest($_SERVER["REQUEST_METHOD"], $id);
        } else {
            NotFoundResponse::makeResponse(["msg" => "Endpoint not found"]);
            exit();
        }
    }
}