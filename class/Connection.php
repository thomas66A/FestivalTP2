<?php

class Connection{

    static $connection;

    static function getConnection(){

        if(empty(self::$connection)){
        
            self::$connection = new PDO(
                "mysql:dbname=festival;host=localhost",
                "root",
                "root"
            );
        }
        return self::$connection;

    }

    private function __construct(){

    }

}

//->getConnection();Tous le temps la meme connexion
//new connection()-> impossible a faire de l'exterieur
// Singleton patern