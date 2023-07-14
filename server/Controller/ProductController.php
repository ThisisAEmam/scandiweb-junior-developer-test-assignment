<?php

namespace Controller;

use api\Responses\CreatedResponse;
use api\Responses\NotFoundResponse;
use api\Responses\ServerErrorResponse;
use api\Responses\SuccessResponse;
use api\Responses\UnprocessedEntityResponse;
use Model\Product;

class ProductController
{

    private Product $model;

    public function __construct()
    {
        $this->model = new Product();
    }

    public function processRequest(string $method, ?string $sku): void
    {
        if ($sku) {
            $this->processResourceRequest($method, $sku);
        } else {
            $this->processCollectionRequest($method);
        }
    }

    private function processResourceRequest(string $method, string $sku): void 
    {
        switch ($method) {
            case "GET":
                $product = $this->model->fetchOne($sku);
                if (! $product) {
                    NotFoundResponse::makeResponse();
                } else {
                    SuccessResponse::makeResponse($product);
                }
                break;
            case "DELETE":
                if ($sku === "all")
                {
                    $err = $this->model->allDelete();
                    if (! $err) {
                        SuccessResponse::makeResponse(["msg" => "Products deleted successfully"]);
                    } else {
                        ServerErrorResponse::makeResponse($err);
                    }
                }
                break;
            default:
                UnprocessedEntityResponse::makeResponse(["msg" => "Method not supported"]);
                break;
        }
    }

    private function processCollectionRequest(string $method): void 
    {
        switch ($method) {
            case "GET":
                $products = $this->model->fetchAll();
                SuccessResponse::makeResponse($products);
                break;
            case "POST":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                $err = $this->model->create($data);
                if (! $err) {
                    CreatedResponse::makeResponse();
                } else {
                    $e = ((array) $err);
                    if (isset($e[" * message"]))
                    {
                        $e = $e[" * message"];
                        if (str_contains($e, "Duplicate entry") && str_contains($e, "for key 'PRODUCT.PRIMARY'")) {

                            UnprocessedEntityResponse::makeResponse(["msg" => "This product's sku already exists"]);
                            exit();
                        };
                    }
                    ServerErrorResponse::makeResponse($err);
                }
                break;
            case "DELETE":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                $err = $this->model->massDelete($data);
                if (! $err) {
                    SuccessResponse::makeResponse(["msg" => "Products deleted successfully"]);
                } else {
                    ServerErrorResponse::makeResponse($err);
                }
                break;
        }
    }
}