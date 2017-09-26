<?php
//Contient les instances des repositories
class BddManager{
    private $noteRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->noteRepository = new noteRepository($this->connection);
    }

    function getNoteRepository(){
        return $this->noteRepository;
    }

    
}