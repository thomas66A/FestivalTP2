<?php

class BddManager{
    private $festivalRepository;
    private $utilisateurRepository;
    private $participationRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->festivalRepository = new FestivalRepository($this->connection);
        $this->utilisateurRepository = new UtilisateurRepository($this->connection);
        $this->participationRepository = new ParticipationRepository($this->connection);
    }

    function getFestivalRepository(){
        return $this->festivalRepository;
    }

    function getUtilisateurRepository(){
        return $this->utilisateurRepository;
    }

    function getParticipationRepository(){
        return $this->participationRepository;
    }

    
}