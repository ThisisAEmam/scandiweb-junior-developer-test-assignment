<?php

namespace api\Responses;

abstract class ResponseBase
{
    public static int $responseCode;
    public static array $body;

    public static function makeResponse(?array $respBody = null): string|false {
        http_response_code(static::$responseCode);
        return json_encode($respBody ?? static::$body);
    }
}