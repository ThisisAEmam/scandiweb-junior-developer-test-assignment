<?php

namespace Controller;

use api\Responses\CreatedResponse;
use api\Responses\NotFoundResponse;
use api\Responses\ServerErrorResponse;
use api\Responses\SuccessResponse;
use api\Responses\UnprocessedEntityResponse;
use Model\Product;
use Model\ProductFactory;

class ProductController
{

    private Product $model;

    public function __construct()
    {
        $this->model = ProductFactory::create();
    }

    public function processRequest(string $method, ?string $sku): string|false
    {
        if ($sku) {
            return $this->processResourceRequest($method, $sku);
        } else {
            return $this->processCollectionRequest($method);
        }
    }

    private function processResourceRequest(string $method, string $sku): string|false 
    {
        switch ($method) {
            case "GET":
                $product = $this->model->fetchOne($sku);
                if (! $product) {
                    return NotFoundResponse::makeResponse();
                } else {
                    return SuccessResponse::makeResponse($product);
                }
                break;
            case "DELETE":
                if ($sku === "all")
                {
                    try
                    {
                        $err = $this->model->allDelete();
                        return SuccessResponse::makeResponse(["msg" => "Products deleted successfully"]);
                    } catch(\Exception $err)
                    {
                        return ServerErrorResponse::makeResponse(["msg" => $err->getMessage()]);
                    }
                }
                break;
            default:
                return UnprocessedEntityResponse::makeResponse(["msg" => "Method not supported"]);
                break;
        }
    }

    private function processCollectionRequest(string $method): string|false 
    {
        switch ($method) {
            case "GET":
                $products = $this->model->fetchAll();
                return SuccessResponse::makeResponse($products);
                break;
            case "POST":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                try {
                    $this->model->create($data);
                    return CreatedResponse::makeResponse();
                } catch (\Exception $err) {
                    $msg = $err->getMessage();
                    return UnprocessedEntityResponse::makeResponse(["msg" => $msg]);

                }
                break;
            case "DELETE":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                try
                {
                    $err = $this->model->massDelete($data);
                    return SuccessResponse::makeResponse(["msg" => "Products deleted successfully"]);
                } catch(\Exception $err)
                {
                    return ServerErrorResponse::makeResponse(["msg" => $err->getMessage()]);
                }
                break;
        }
    }
}