<?php

namespace api\Responses;

class NotFoundResponse extends ResponseBase
{
    public static int $responseCode = 404;
    public static array $body = ["msg" => "Product not found"];
}