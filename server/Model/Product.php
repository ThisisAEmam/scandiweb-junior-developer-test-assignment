<?php

namespace Model;

use Database\Database;
use Exception;

class Product
{
    private \PDO $conn;

    public function __construct()
    {
        $this->conn = (new Database())->getConnection();
    }

    public function fetchAll(): array
    {
        $sql = "SELECT p.sku, p.name, p.price, p.productType, JSON_OBJECTAGG(pa.label, pav.value) AS attributes
                FROM PRODUCT AS p
                LEFT JOIN PRODUCT_ATTRIBUTE_VALUE AS pav
                ON p.sku = pav.product_sku
                LEFT JOIN PRODUCT_ATTRIBUTE AS pa
                ON pa.id = pav.attribute_id
                GROUP BY p.sku
                ORDER BY p.updated_at DESC;";
        
        $stmt = $this->conn->query($sql);

        $data = [];
        while ($row = $stmt->fetch(\PDO::FETCH_ASSOC))
        {
            $row["attributes"] = json_decode($row["attributes"], true);
            $data[] = $row;
        }
        return $data;
    }

    public function fetchOne(string $sku): array
    {
        $sql = sprintf("SELECT p.sku, p.name, p.price, p.productType, JSON_OBJECTAGG(pa.label, pav.value) AS attributes
                        FROM PRODUCT AS p
                        LEFT JOIN PRODUCT_ATTRIBUTE_VALUE AS pav
                        ON p.sku = pav.product_sku
                        LEFT JOIN PRODUCT_ATTRIBUTE AS pa
                        ON pa.id = pav.attribute_id
                        WHERE p.sku = '%s'
                        GROUP BY p.sku;", $sku);
        $stmt = $this->conn->query($sql);
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$row) {
            return [];
        }        
        $row["attributes"] = json_decode($row["attributes"], true);
        return $row;
    }

    public function create(array $data): void
    {
        try {
            $sql = "INSERT INTO PRODUCT (sku, name, price, productType) VALUES (:sku, :name, :price, :productType)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(":sku", $data["sku"], \PDO::PARAM_STR);
            $stmt->bindValue(":name", $data["name"], \PDO::PARAM_STR);
            $stmt->bindValue(":price", $data["price"], \PDO::PARAM_INT);
            $stmt->bindValue(":productType", $data["productType"], \PDO::PARAM_STR);
            $stmt->execute();
    
            foreach($data["attributes"] as $att => $val) 
            {
                $stmt1 = $this->conn->prepare("SELECT id FROM PRODUCT_ATTRIBUTE WHERE label = :label");
                $stmt1->bindValue(":label", $att, \PDO::PARAM_STR);
                $stmt1->execute();
                $attId = $stmt1->fetch()["id"];
    
                $sql = "INSERT INTO PRODUCT_ATTRIBUTE_VALUE (product_sku, attribute_id, value) VALUES (:pid, :attid, :value)";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindValue(":pid", $data["sku"], \PDO::PARAM_INT);
                $stmt->bindValue(":attid", $attId, \PDO::PARAM_STR);
                $stmt->bindValue(":value", $val, \PDO::PARAM_STR);
                $stmt->execute();
            }
        } catch (\PDOException $e)
        {
            if ($e->errorInfo[1] == 1062) 
            {
                throw new Exception("This product's sku already exists");
            } else {
                throw $e;
            }
        }
    }

    public function massDelete(array $data): void
    {
        foreach($data as $sku)
        {
            $sql = sprintf("DELETE FROM PRODUCT WHERE sku = '%s';", $sku);
            $this-> conn->query($sql);
        }
    }

    public function allDelete(): void
    {
        $sql = "DELETE FROM PRODUCT;";
        $this-> conn->query($sql);
    }
}