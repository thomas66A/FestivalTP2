<?php
class Festival extends Model implements jsonserializable{
    
    private $title;
    private $type;
    private $dateDebut;
    private $dateFin;
    private $lat;
    private $lng;


    function getTitle(){
        return $this->title;
    }

    function getType(){
        return $this->type;
    }

    function getDateDebut(){
        return $this->dateDebut;
    }

    function getDateFin(){
        return $this->dateFin;
    }

    function getLat(){
        return $this->lat;
    }

    function getLng(){
        return $this->lng;
    }

    function setTitle($title){
        $this->title = $title;
    }

    function setType($type){
        $this->type = $type;
    }

    function setDateDebut($dateDebut){
        $this->dateDebut = $dateDebut;
    }

    function setDateFin($dateFin){
        $this->dateFin = $dateFin;
    }

    function setLat($lat){
        $this->lat = $lat;
    }

    function setLng($lng){
        $this->lng = $lng;
    }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "title" => $this->title,
            "type" => $this->type,
            "dateDebut" => $this->dateDebut,
            "dateFin" => $this->dateFin,
            "lat"=>$this->lat,
            "lng"=>$this->lng
        ];
        
    }

    
}