<?php

class BddManager{
    private $festivalRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->festivalRepository = new FestivalRepository($this->connection);
    }

    function getFestivalRepository(){
        return $this->festivalRepository;
    }

    
}