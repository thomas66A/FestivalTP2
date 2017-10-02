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


Flight::route("POST /CreerCompte", function(){
    $name = Flight::request()->data["name"];
    $password = Flight::request()->data["password"];
    $BddManager = Flight::get("BddManager");
    $repo = $BddManager->getUtilisateurRepository();
    $data = $repo->createUtilisateur($name, $password);
    
    if( $data != 0 ){
        echo json_encode($data);
    }  
    else{
        $data = false;
        echo json_encode($data); 
    }
});

Flight::route("POST /login", function(){
    $name = Flight::request()->data["name"];
    $password = Flight::request()->data["password"];
    $BddManager = Flight::get("BddManager");
    $repo = $BddManager->getUtilisateurRepository();
    $data = $repo->getUtilisateur($name, $password);
    
    if( $data != 0 ){
        echo json_encode($data);
    }  
    else{
        $data = false;
        echo json_encode($data); 
    }
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

Flight::route("POST /jyParticipe", function(){
    $title = Flight::request()->data["title"];
    $idUtilisateur = Flight::request()->data["idUtilisateur"];
    $BddManager = Flight::get("BddManager");
    $repo = $BddManager->getFestivalRepository();
    $idFestival = $repo->getIdFestival($title);
    $id = $idFestival['id'];
    
    $repo1 = $BddManager->getParticipationRepository();
    $repo1->newParticipation($idUtilisateur, $id);
    
    echo json_encode($id);
});

Flight::route("POST /mesParticipations", function(){
    
    $idUtilisateur = Flight::request()->data["idUtilisateur"];
    $BddManager = Flight::get("BddManager"); 
    $repo = $BddManager->getParticipationRepository();
    $result = $repo->getParticipation($idUtilisateur);
    $participation=[];
    for($i=0; $i<sizeof($result); $i++){
        $id = $result[$i]['festivalId'];
        $participation[] = $id;
    }
    $festivals=[];
    for($i=0; $i<sizeof($participation); $i++){
        $repo1 = $BddManager->getFestivalRepository();
        $festival = $repo1->getTitleFestival($participation[$i]);
        $festivals[]=$festival['title'];
    }
    
    echo json_encode($festivals);
});


Flight::start();