<?php

    namespace Areuka\Engine;
    
    class DB {
        protected static $database = null;
        public static function getDB(){
            $options = [\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_OBJ, \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION];
            if(self::$database === null) self::$database = new \PDO("mysql:host=".HOST_NAME.";dbname=".DB_NAME.";charset=utf8mb4", USER_NAME, PASSWORD, $options);
            return self::$database;
        }
        public static function query($sql, $data = []){
            $q = self::getDB()->prepare($sql);
            $q->execute($data);
            return $q;
        }
        public static function fetch($sql , $data = []){
            return self::query($sql, $data)->fetch();
        }
        public static function fetchAll($sql , $data = []){
            return self::query($sql, $data)->fetchAll();
        }

        public static function find($table, $id){
            return self::fetch("SELECT * FROM {$table} WHERE id = {$id}");
        }

        public static function getWhere($table, $condition = []){
            $condition = implode($condition);
            return self::fetchAll("SELECT * FROM {$table} WHERE {$condition}");
        }

        public static function lastInsertId(){
            return DB::$database->lastInsertId();
        }
    }