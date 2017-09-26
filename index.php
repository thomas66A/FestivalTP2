<?php
header("Access-Control-Allow_origin:*", false);
require "autoload.php";
require "flight/Flight.php";
//enregistrer en global dans flight le Bddmanager
Flight::set("BddManager", new Bddmanager());

Flight::route("/notes/show", function(){
    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getNoteRepository();
    $notes = $repo->getAll();
    echo json_encode($notes);
});

Flight::route("/notes/getNote", function(){
    $id = Flight::request()->data["id"];
    $BddManager = Flight::get("BddManager");
    $repo = $BddManager->getNoteRepository();
    $note = $repo->getNote($id);
    echo json_encode($note);
});

Flight::route("POST /notes/changeNote", function(){
    $id = Flight::request()->data["id"];
    $title = Flight::request()->data["title"];
    $content = Flight::request()->data["content"];
    $BddManager = Flight::get("BddManager");
    $repo = $BddManager->getNoteRepository();
    $bon = $repo->updateNote($id, $title, $content);
   
    echo json_encode($bon);
});

Flight::route("POST /notes", function(){
    $title = Flight::request()->data["title"];
    $content = Flight::request()->data["content"];
    $BddManager = Flight::get("BddManager");
    $repo = $BddManager->getNoteRepository();
    $repo->createNote($title, $content);
    echo json_encode($title);
});

Flight::route("/notes/sup", function(){
    $id = Flight::request()->data["id"];
    $BddManager = Flight::get("BddManager");
    $repo = $BddManager->getNoteRepository();
    $repo->supNote($id);
    echo json_encode($id);
});

Flight::route("PUT /notes/put", function(){
    //pour recuperer des données PUT -> les donnees sont encodé en JSON string
    //il faut donc le decoder
    $json = Flight::request()->getBody();
    $objet = json_decode($json, true);
    echo json_encode($objet['test']);
});

Flight::start();