<?php
class FestivalRepository extends Repository{
    
    function getAll(){
        $query = "SELECT * FROM festival";
        $result = $this->connection->query($query);
        $result = $result->fetchAll(PDO::FETCH_ASSOC);
        $festival = [];
        foreach($result as $data){
            $festival[] = new Festival ( $data );
        }
        return $festival;
    }

    function getIdFestival($title){
        $prepared = $this->connection->prepare("SELECT * FROM festival WHERE title=:title");
        $prepared->execute(array(
            "title" => $title
        ));
        $result = $prepared->fetch(PDO::FETCH_ASSOC);
        
            return $result;
        
       
    }
    function getTitleFestival($id){
        $prepared = $this->connection->prepare("SELECT * FROM festival WHERE id=:id");
        $prepared->execute(array(
            "id" => $id
        ));
        $result = $prepared->fetch(PDO::FETCH_ASSOC);
        
            return $result;
        
       
    }

    function createUtilisateur($nom, $password){
        $query = $this->connection->prepare("INSERT INTO utilisateur SET name=:name,password=:password");
        $query->execute(array(
            'name'=>$nom,
            'password'=>$password
        ));
        return $this->connection->lastInsertId();
    }

    function addMarkerInBdd($lat, $lng, $title, $type, $debut, $fin){
        $query = $this->connection->prepare("INSERT INTO festival SET title=:title,type=:type,dateDebut=:dateDebut,dateFin=:dateFin,lat=:lat,lng=:lng");
        $query->execute(array(
            'title'=>$title,
            'type'=>$type,
            'dateDebut'=>$debut,
            'dateFin'=>$fin,
            'lat'=>$lat,
            'lng'=>$lng
        ));
        return $this->connection->lastInsertId();
    }
    //position, title, type, debut, fin
    // function supNote($id){
    //     $query = $this->connection->prepare("DELETE FROM notes WHERE id=:id");
    //     $query->execute(array(
    //         'id'=>$id
    //     ));
    // }

    // function updateNote($id, $title, $content){
    //     $query = $this->connection->prepare("UPDATE notes SET title=:title,content=:content WHERE id=:id");
    //     $query->execute(array(
    //         'id'=>$id,
    //         'title'=>$title,
    //         'content'=>$content
    //     ));
    // }
}