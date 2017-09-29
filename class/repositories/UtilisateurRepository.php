<?php
class UtilisateurRepository extends Repository{
    function createUtilisateur($nom, $password){
        
        
        $prepared = $this->connection->prepare("SELECT * FROM utilisateur WHERE name=:name");
        $prepared->execute(array(
            "name" => $nom
        ));
        $result = $prepared->fetch(PDO::FETCH_ASSOC);
        
        if($result!=false)
        {
            return false;
        }
        else{
        $admin = 0;
        $query = $this->connection->prepare("INSERT INTO utilisateur SET name=:name,password=:password,admin=:admin");
        $query->execute(array(
            'name'=>$nom,
            'password'=>$password,
            'admin'=>$admin
        ));
        return [
            "id" => $this->connection->lastInsertId(),
            "name"=> $nom,
            "password" => $password,
            "admin" => $admin,
            "festivalId" => []
            ];
        
        }
    }
}