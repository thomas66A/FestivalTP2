<?php

class BddManager{
    private $festivalRepository;
    private $utilisateurRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->festivalRepository = new FestivalRepository($this->connection);
        $this->utilisateurRepository = new UtilisateurRepository($this->connection);
    }

    function getFestivalRepository(){
        return $this->festivalRepository;
    }

    function getUtilisateurRepository(){
        return $this->utilisateurRepository;
    }

    
}