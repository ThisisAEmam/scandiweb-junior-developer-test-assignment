<?php

namespace Database;

use Model\Product;

class PopulateDatabase {    
    public static function populate(): mixed
    {
        $err = null;
        $items = json_decode(file_get_contents(POPULATE_DATA_PATH), true);
        $model = new Product();
        foreach($items as $item) {
            try {
                $er = $model->create($item);
                if ($er) {
                    return $er;
                }
            } catch (\Exception $e) {
                $err = $e;
                break;
            }
        }
        return $err;
    }
}