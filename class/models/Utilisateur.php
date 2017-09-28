<?php
class Utilisateur extends model implements jsonserializable{

    private $name;
    private $password;
    private $admin;
    private $festivalId;

    function getName(){
        return $this->name;
    }

    function setName($name){
        $this->name = $name;
    }

    function getPassword(){
        return $this->password;
    }

    function setPassword($password){
        $this->password = $password;
    }

    function getAdmin(){
        return $this->admin;
    }

    function setAdmin($admin){
        $this->admin = $admin;
    }

    function getFestivalId(){
        return $this->festivalId;
    }

    function setFestivalId($festivalId){
        $this->festivalId = $festivalId;
    }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "name" => $this->name,
            "password" => $this->password,
            "admin" => $this->admin,
            "festivalId" => $this->festivalId
        ];
        
    }

}