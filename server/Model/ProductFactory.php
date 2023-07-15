<?php

namespace Model;

class ProductFactory
{
    public static function create()
    {
        return new Product();
    }
}