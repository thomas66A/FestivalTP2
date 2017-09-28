<?php
header("Access-Control-Allow_origin:*", false);
require "autoload.php";
require "flight/Flight.php";
Flight::set("BddManager", new Bddmanager());

Flight::route("/GetFestivalInBdd", function(){
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getFestivalRepository();
    $festivals = $repo->getAll();
    echo json_encode($festivals);
});

// Flight::route("/notes/getNote", function(){
//     $id = Flight::request()->data["id"];
//     $BddManager = Flight::get("BddManager");
//     $repo = $BddManager->getNoteRepository();
//     $note = $repo->getNote($id);
//     echo json_encode($note);
// });

Flight::route("POST /CreerCompte", function(){
    $name = Flight::request()->data["name"];
    $password = Flight::request()->data["password"];
    $BddManager = Flight::get("BddManager");
    $repo = $BddManager->getFestivalRepository();
    $id = $repo->createUtilisateur($name, $password);
    if( $id != 0 ){
        $status["success"] = true;
        $status["id"] = $id;
    }  
    echo json_encode($id);
});

Flight::route("POST /addMarkerInBdd", function(){
    $lat = Flight::request()->data["lat"];
    $lng = Flight::request()->data["lng"];
    $title = Flight::request()->data["title"];
    $type = Flight::request()->data["type"];
    $debut = Flight::request()->data["debut"];
    $fin = Flight::request()->data["fin"];
    
    $BddManager = Flight::get("BddManager");
    $repo = $BddManager->getFestivalRepository();
    $id = $repo->addMarkerInBdd($lat, $lng, $title, $type, $debut, $fin);
    if( $id != 0 ){
        $status["success"] = true;
        $status["id"] = $id;
    }  
    echo json_encode($id);
});

// Flight::route("POST /notes", function(){
//     $title = Flight::request()->data["title"];
//     $content = Flight::request()->data["content"];
//     $BddManager = Flight::get("BddManager");
//     $repo = $BddManager->getNoteRepository();
//     $repo->createNote($title, $content);
//     echo json_encode($title);
// });

// Flight::route("/notes/sup", function(){
//     $id = Flight::request()->data["id"];
//     $BddManager = Flight::get("BddManager");
//     $repo = $BddManager->getNoteRepository();
//     $repo->supNote($id);
//     echo json_encode($id);
// });

// Flight::route("PUT /notes/put", function(){
//     //pour recuperer des données PUT -> les donnees sont encodé en JSON string
//     //il faut donc le decoder
//     $json = Flight::request()->getBody();
//     $objet = json_decode($json, true);
//     echo json_encode($objet['test']);
// });

Flight::start();