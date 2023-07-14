<?php

namespace Database;

class Database
{
    public function getConnection(): \PDO
    {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8', DB_HOST, DB_DATABASE_NAME);

        return new \PDO($dsn, DB_USERNAME, DB_PASSWORD, [
            \PDO::ATTR_EMULATE_PREPARES => false,
            \PDO::ATTR_STRINGIFY_FETCHES => false
        ]);
    }
}