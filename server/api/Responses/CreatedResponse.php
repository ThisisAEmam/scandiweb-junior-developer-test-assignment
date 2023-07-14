<?php

namespace api\Responses;

class CreatedResponse extends ResponseBase
{
    public static int $responseCode = 201;
    public static array $body = ["msg" => "Product created successfully"];
}